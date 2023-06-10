import useCurrentContextIndex from '@/hooks/useCurrentContextIndex'
import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import SingleChatComponent from './SingleChatComponent'

const MessagesContainer = ({ messageContainerRef }) => {
	const currentChatContextIndex = useCurrentContextIndex()

	const messages = useSelector(
		(state) =>
			state.chat.chatContexts[currentChatContextIndex]?.messages || []
	)

	useEffect(() => {
		messageContainerRef.current.scrollTop =
			messageContainerRef.current.scrollHeight
	}, [messages, messageContainerRef])

	return (
		<div className='flex-grow overflow-auto' ref={messageContainerRef}>
			{messages.slice(0).map((message) => (
				<div key={nanoid()}>
					<SingleChatComponent message={message} />
				</div>
			))}
		</div>
	)
}

export default MessagesContainer
