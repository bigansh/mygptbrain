//@ts-nocheck
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
	ChakraProvider,
	Heading,
	Text,
	Flex,
	Image,
	Button,
	Link,
} from '@chakra-ui/react'
import './popup.css'
import { extendTheme } from '@chakra-ui/react'
import '@fontsource/work-sans'
import { getStoredLinks, getStoredOptions } from '../utils/storage'

const theme = extendTheme({
	fonts: {
		heading: `'Work Sans', sans-serif`,
		body: `'Work Sans', sans-serif`,
	},
	styles: {
		global: () => ({
			html: {
				bg: '',
				color: '',
			},
			body: {
				bg: '',
				color: '',
			},
		}),
	},
})

const Popup: React.FC<{}> = () => {
	const [options, setOptions] = useState(null)
	const [cookie, setCookie] = useState<any>()
	const [bookmark, setBookmark] = useState({
		id: '',
		heading: '',
		description: '',
	})

	chrome.storage.onChanged.addListener((changes, namespace) => {
		if (changes.links?.newValue) {
			if (
				changes.links.newValue.length !== changes.links.oldValue.length
			) {
				const currentLink = links?.newValue.filter(
					({ id: id1 }) =>
						!changes?.links?.oldValue.some(
							({ id: id2 }) => id2 === id1
						)
				)[0]

				setBookmark(currentLink)
			} else {
				setBookmark(
					changes.links.newValue.find((b) => b.id == bookmark.id)
				)
			}
		}
	})

	useEffect(() => {
		saveLinks()
		getStoredOptions().then((options: any) => {
			setOptions(options)
		})
	}, [])

	const saveLinks = () => {
		chrome.tabs.query(
			{
				active: true,
				currentWindow: true,
			},
			(tabs) => {
				if (tabs.length > 0) {
					getStoredLinks().then((links: any) => {
						const isSaved = links.find(
							(e) => e.documentMetadata.url == tabs[0].url
						)

						if (!isSaved) {
							chrome.runtime.sendMessage({
								message: 'ADD_TO_DOCUMENTS',
								payload: { tab: tabs[0] },
							})
						} else {
							setBookmark({
								id: isSaved.document_id,
								heading: isSaved?.heading,
								description: isSaved?.description,
							})
						}
					})
				}
			}
		)
	}

	const getCookie = async () => {
		await chrome.cookies
			.get({
				url: 'https://testing.mygptbrain.com/',
				name: 'x-session-token',
			})
			.then((c) => {
				if (c?.value) {
					setCookie(c?.value)
				} else {
					chrome.tabs.query(
						{
							active: true,
							currentWindow: true,
						},
						(tabs) => {
							if (tabs.length > 0) {
								const redirectUrl = encodeURIComponent(
									tabs[0].url
								)
								chrome.tabs.create({
									url: `https://testing.mygptbrain.com/onboarding/login?redirect=${redirectUrl}`,
								})
							}
						}
					)
				}
			})
			.catch((err) => {
				console.log(err, 'err')
				if (
					err?.message ==
					'The cookie is missing a required attribute.'
				) {
					chrome.tabs.create({
						url: `http://testing.mygptbrain.com/onboarding/login?redirect=${chrome.runtime.getURL()}`,
					})
				}
			})
	}

	getCookie()

	return (
		<ChakraProvider theme={theme}>
			{cookie && (
				<Flex className='popup' direction='column' gap={4} m={6}>
					<Heading lineHeight={1} fontWeight={400} fontSize='2xl'>
						Bookmark Saved!
					</Heading>
					<Text
						fontSize='md'
						noOfLines={3}
						textTransform='capitalize'
					>
						{bookmark?.heading}
					</Text>
					<Text fontSize='sm' noOfLines={3}>
						{bookmark?.description}
					</Text>
				</Flex>
			)}
		</ChakraProvider>
	)
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<Popup />, root)
