'use client'

import {
	Heading,
	Text,
	Flex,
	Button,
	useColorMode,
	Box,
	useColorModeValue,
} from '@chakra-ui/react'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const scrollingTexts = [
	'imagine not having to read your bookmarks...',
	'an assistant that could answer questions, contextual to your bookmarks...',
	'a service that syncs with notion tables, drive file, pocket articles, & much more.',
]

export default function Home() {
	const { toggleColorMode } = useColorMode()
	const [focusedTextIndex, setFocusedTextIndex] = useState(0)

	useEffect(() => {
		function scrollHandler(e) {
			setFocusedTextIndex(
				Math.round(e.target.defaultView.scrollY / window.innerHeight)
			)
		}
		window.addEventListener('scroll', scrollHandler)
		return () => window.removeEventListener('scroll', scrollHandler)
	}, [])

	return (
		<>
			<section
				data-w-id='38731044-e467-6d7d-8b84-2e54494432a0'
				class='section wf-section'
			>
				<div class='div-block'>
					<div
						class='w-layout-blockcontainer container w-container'
						style={{ maxWidth: 'unset' }}
					>
						<div
							class='div-block-2'
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 32,
							}}
						>
							{/* <div class='text _1'></div>
							<div class='text _2'>
								imagine not having to read your bookmarks...
							</div>
							<div class='text _3'>
								imagine not having to read your bookmarks...
							</div> */}
							{scrollingTexts.map((text, index) => (
								<motion.p
									animate={{
										y: `-${focusedTextIndex * 100}%`,
										opacity:
											index > focusedTextIndex
												? 0
												: focusedTextIndex - index === 1
												? 0.75
												: focusedTextIndex - index === 2
												? 0.5
												: 1,
										transition: {
											type: 'just',
										},
									}}
									style={{
										fontSize:
											focusedTextIndex - index === 1
												? 24
												: focusedTextIndex - index === 2
												? 20
												: 26,
										display:
											index > focusedTextIndex
												? 'none'
												: undefined,
									}}
								>
									{text}
								</motion.p>
							))}
						</div>
					</div>
				</div>
			</section>
			<section class='section-2 wf-section'>
				<div>This is some text inside of a div block.</div>
				<a href='#' class='w-button'>
					Button Text
				</a>
			</section>
			<Script>Webflow.require(‘ix2’).init()</Script>
		</>
	)
}
