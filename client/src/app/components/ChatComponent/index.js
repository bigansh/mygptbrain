'use client'

import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'
import MessagesContainer from './MessagesContainer'
import SingleChatComponent from './SingleChatComponent'

const ChatUI = () => {
	 

	const messageContainerRef = useRef(null)
	return (
		<div className='flex flex-col h-full'>
			<MessagesContainer messageContainerRef={messageContainerRef} />
			<Input messageContainerRef={messageContainerRef} />
		</div>
	)
}

export default ChatUI
