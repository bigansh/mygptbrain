import { useColors } from '@/utils/colors'
import React, { useEffect, useRef, useState } from 'react'
import {
	ChatMessagesContainer,
	ChatInput,
} from '@/app/app/dashboard/components'
import { Button, Flex } from '@chakra-ui/react'
const ChatWrapper = ({ isSidebarOpen }) => {
	const { base, base800, base700, text } = useColors()
	const [inputValue, setInputValue] = useState('')
	const divRef = useRef()

	return (
		<Flex
			flexDir={'column'}
			w={isSidebarOpen ? '60vw' : '80vw'}
			maxW={isSidebarOpen ? '60vw' : '80vw'}
			transition={'all 0.5s ease-in'}
			background={base}
		>
			<ChatMessagesContainer
				inputValue={inputValue}
				setInputValue={setInputValue}
				divRef={divRef}
			/>

			<ChatInput
				inputValue={inputValue}
				setInputValue={setInputValue}
				divRef={divRef}
			/>
		</Flex>
	)
}

export default ChatWrapper
