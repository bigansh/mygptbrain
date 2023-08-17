'use client'

import { Button, Container, Flex, Text, useColorMode } from '@chakra-ui/react'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Footer } from '@/components'
import { useColors } from '@/utils/colors'

const scrollingTexts = [
	'imagine not having to read your bookmarks...',
	'an assistant that could answer questions, contextual to your bookmarks...',
	'a service that syncs with notion tables, drive file, pocket articles, & much more.',
]

export default function Home() {
	const { base700, text, base600 } = useColors()
	const [focusedTextIndex, setFocusedTextIndex] = useState(0)
	const [isPastScrollingText, setIsPastScrollingText] = useState(false)
	const staticSectionRef = useRef(null)

	useEffect(() => {
		function scrollHandler(e) {
			const indexToSet = Math.round(
				e.target.defaultView.scrollY / window.innerHeight
			)
			if (!isPastScrollingText && indexToSet >= scrollingTexts.length) {
				const sectionFromTop =
					staticSectionRef.current?.getClientRects()?.[0].top
				if (sectionFromTop <= 0) {
					setIsPastScrollingText(true)
				}
			}
			setFocusedTextIndex(indexToSet)
		}
		window.addEventListener('scroll', scrollHandler)
		return () => window.removeEventListener('scroll', scrollHandler)
	}, [])

	return (
		<>
			<AnimatePresence>
				{!isPastScrollingText ? (
					<motion.section
						data-w-id='38731044-e467-6d7d-8b84-2e54494432a0'
						class='section wf-section'
						exit={{ opacity: 0 }}
						animate={{ opacity: 1 }}
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
									{scrollingTexts.map((text, index) => (
										<motion.p
											animate={{
												y: `-${
													focusedTextIndex * 100
												}%`,
												opacity:
													index > focusedTextIndex
														? 0
														: focusedTextIndex -
																index ===
														  1
														? 0.75
														: focusedTextIndex -
																index ===
														  2
														? 0.5
														: 1,
												transition: {
													type: 'just',
												},
											}}
											style={{
												fontSize:
													focusedTextIndex - index ===
													1
														? 24
														: focusedTextIndex -
																index ===
														  2
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
					</motion.section>
				) : null}
			</AnimatePresence>
			<Flex
				ref={staticSectionRef}
				minHeight='100vh'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
			>
				<Text fontSize='larger' color='black' marginBottom='2'>
					now stop imagining...
				</Text>
				<Button
					title='login'
					fontWeight={'400'}
					bg={base700}
					_hover={{
						bg: base600,
					}}
					color={text}
					cursor={'pointer'}
					mt={2}
				>
					lets get started
				</Button>
			</Flex>
			<Footer />
			<Script>Webflow.require(‘ix2’).init()</Script>
		</>
	)
}
