'use client'

import {
	addNewMessage,
	createNewChatContext,
	setChatContext,
} from '@/store/reducers/chatReducer'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from './Input'
import MessagesContainer from './MessagesContainer'
import SingleChatComponent from './SingleChatComponent'

const ChatUI = () => {
	const dispatch = useDispatch()

	const messageContainerRef = useRef(null)
	return (
		<div className='flex flex-col h-full'>
			<MessagesContainer messageContainerRef={messageContainerRef} />
			<Input messageContainerRef={messageContainerRef} />
		</div>
	)
}

export default ChatUI
