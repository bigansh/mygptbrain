import { SendArrow } from '@/app/assets'
import useCurrentContextIndex from '@/hooks/useCurrentContextIndex'
import { addNewMessage } from '@/store/reducers/chatReducer'
import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Input = ({ messageContainerRef }) => {
	const currentChatContextIndex = useCurrentContextIndex()
	console.log(currentChatContextIndex)

	const [inputValue, setInputValue] = useState('')
	const [newMessage, setNewMessage] = useState(null)

	const dispatch = useDispatch()

	const messages = useSelector((state) => state.chat)

	const handleInputChange = (e) => {
		setInputValue(e.target.value)
	}

	const handleSendMessage = () => {
		if (inputValue.trim() !== '') {
			setNewMessage({
				id: nanoid(),
				sender: 'user',
				text: inputValue,
				timestamp: new Date().toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
				}),
			})

			setInputValue('')
		}
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.ctrlKey) {
			e.preventDefault()
			handleSendMessage(inputValue)
		}
	}

	useEffect(() => {
		if (newMessage) {
			dispatch(
				addNewMessage({
					contextID: currentChatContextIndex,
					message: newMessage,
				})
			)
		}
	}, [dispatch, newMessage, currentChatContextIndex])

	return (
		<div>
			<div className='p-2 px-6 sticky  py-2  my-2 flex items-center  bg-[#DFE8FF80]'>
				<textarea
					rows={2}
					placeholder='Type your message...'
					className='flex-grow px-4 pt-2 rounded-lg focus:outline-none  resize-none text-xl bg-transparent'
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
				/>
				<div className=''>
					<button
						className='ml-2  text-black   rotate-45'
						onClick={handleSendMessage}
					>
						<SendArrow className='-rotate-45' />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Input
