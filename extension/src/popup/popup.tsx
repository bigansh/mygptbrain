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
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(true)

	chrome.storage.onChanged.addListener((changes, namespace) => {
		if (changes.links?.newValue) {
			setError(false)
			if (
				changes.links.newValue.length !== changes.links.oldValue.length
			) {
				const currentLink = links?.newValue.filter(
					({ id: id1 }) =>
						!changes?.links?.oldValue.some(
							({ id: id2 }) => id2 === id1
						)
				)[0]
				setLoading(false)
				setError(false)
				setBookmark(currentLink)
			} else {
				setLoading(false)
				setError(false)
				setBookmark(
					changes.links.newValue.find((b) => b.id == bookmark.id)
				)
			}
		}
	})

	useEffect(() => {
		setError(false)
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
							setLoading(false)
							setError(false)
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
				url: 'https://mygptbrain.com/',
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
									url: `https://mygptbrain.com/onboarding/login?redirect=${redirectUrl}`,
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
						url: `http://mygptbrain.com/onboarding/login?redirect=${chrome.runtime.getURL()}`,
					})
				}
			})
	}

	const Error = ({ error }) => {
		console.log(error, 'mod')
		return (
			<Flex w={'300px'} p={2} gap={2} flexDir={'column'}>
				{error?.subject == 'error' && (
					<>
						<h1>{error?.content}</h1>
						<p>Some error occured while bookmarking</p>
					</>
				)}
				{error?.subject == 'pay' && (
					<>
						<h1>Free Tier Exhausted</h1>
						<p>Upgrade to add unlimited bookmarks</p>

						<a href='https://checkout.stripe.com/c/pay/cs_test_b16bzjrtko4x1G0tUkOdm1cR29eYr76ncIBp1TdWkc7UUMPwXeWZTqM6kr#fidkdWxOYHwnPyd1blpxYHZxWjA0SzEwM1xWTHFXbG5SV0ZsU1wzVXRucnNvYWg8YHU9ZHFQYTNRcEFQbjVsa1B3PWBqYktmV2BgUH1zdG8wUFVcbUQ2fGBnYk4yMlBfNHNgfGlUNE90aTxoNTVNcG9iUFNzRid4JSUl'>
							Upgrade
						</a>
					</>
				)}
			</Flex>
		)
	}

	chrome.runtime.onMessage.addListener(function (
		request,
		sender,
		sendResponse
	) {
		if (request.msg === 'ERROR') {
			//  To do something
			setLoading(false)
			console.log(request)
			setError(request.data)
		}
	})

	getCookie()

	console.log(loading, error, bookmark)
	return (
		<ChakraProvider theme={theme}>
			{cookie &&
				(loading ? (
					<Flex w={'400px'} p={2} gap={2} flexDir={'column'}>
						<h1>loading</h1>
					</Flex>
				) : error ? (
					<Error error={error} />
				) : (
					<Flex
						w={'300px'}
						className='popup'
						direction='column'
						gap={4}
						m={6}
					>
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
				))}
		</ChakraProvider>
	)
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<Popup />, root)
