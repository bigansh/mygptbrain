import { AddThreadIcon } from '@/app/assets'
import { setCurrentChatContext, setNewChat } from '@/store/reducers/chatReducer'
import { nanoid } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const AddChatButton = () => {
	const handleAddChat = (e) => {
		// Logic to add a new chat
		e.preventDefault()
		const newChat = {
			id: nanoid(),
			title: 'Context New' + nanoid(),
			messages: [],
		}

		console.log(newChat)

		dispatch(setCurrentChatContext(newChat.id))
		dispatch(setNewChat({ contextID: newChat.id, newChat }))
	}

	const dispatch = useDispatch()

	return (
		<div className='flex items-center justify-between bg-[#DFE8FF80]'>
			<button
				className='     text-black   py-2 px-4 rounded-md text-2xl focus:outline-none'
				onClick={handleAddChat}
			>
				new thread
			</button>
			<div className='px-4'>
				<AddThreadIcon />
			</div>
		</div>
	)
}

export default AddChatButton
