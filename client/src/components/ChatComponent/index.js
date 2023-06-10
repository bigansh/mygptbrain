'use client'

import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'

const ChatUI = () => {
	const [inputValue, setInputValue] = useState('')
	const [messages, setMessages] = useState([
		{ id: 1, sender: 'user', text: 'Hello!', timestamp: '9:00 AM' },
		{
			id: 2,
			sender: 'bot',
			text: 'Hi',
			timestamp: '9:01 AM',
		},
		{ id: 3, sender: 'user', text: 'How are you?', timestamp: '9:02 AM' },
		{
			id: 4,
			sender: 'bot',
			text: 'I am good, thanks!',
			timestamp: '9:03 AM',
		},
	])

	const messageContainerRef = useRef(null)

	useEffect(() => {
		// Scroll to the bottom of the message container
		messageContainerRef.current.scrollTop =
			messageContainerRef.current.scrollHeight
	}, [messages])

	return (
		<div className='flex flex-col h-full px-6'>
			<div className='flex-grow overflow-auto' ref={messageContainerRef}>
				{messages
					.slice(0)
					.reverse()
					.map((message) => (
						<div
							key={message.id}
							className={` flex items-start justify-start space-x-4 py-8 px-6 ${
								message.sender === 'user'
									? 'bg-[#DFE8FF80] bg-opacity-50 text-white '
									: 'bg-white'
							}`}
						>
							<div>
								{message.sender === 'user' ? (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										class='h-12 w-12 text-black'
										fill='none'
										viewBox='0 0 24 24'
										className='w-12 h-12 text-black'
										stroke='currentColor'
										stroke-width='2'
									>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
										/>
									</svg>
								) : (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										class='h-12 w-12 text-black'
										fill='none'
										viewBox='0 0 24 24'
										className='w-12 h-12 text-black'
										stroke='currentColor'
										stroke-width='2'
									>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
										/>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
										/>
									</svg>
								)}
							</div>

							<div className={`rounded-lg p-2 w-full `}>
								<p className='text-xl text-black'>
									{message.text}
								</p>
							</div>
						</div>
					))}
			</div>
			<Input
				inputValue={inputValue}
				setInputValue={setInputValue}
				messages={messages}
				setMessages={setMessages}
			/>
		</div>
	)
}

export default ChatUI
