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
import { Head } from 'next/document'
import Script from 'next/script'

export default function Home() {
	const { toggleColorMode } = useColorMode()

	return (
		<>
			<section
				data-w-id='38731044-e467-6d7d-8b84-2e54494432a0'
				class='section wf-section'
			>
				<div class='div-block'>
					<div class='w-layout-blockcontainer container w-container'>
						<div class='div-block-2'>
							<div class='text _1'>
								imagine not having to read your bookmarks...
							</div>
							<div class='text _2'>
								imagine not having to read your bookmarks...
							</div>
							<div class='text _3'>
								imagine not having to read your bookmarks...
							</div>
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
