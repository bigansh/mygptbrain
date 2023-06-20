import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	chatContexts: [
		{
			id: 1,
			title: 'Context 1',
			messages: [
				{ id: 1, sender: 'user', text: 'Hello!', timestamp: '9:00 AM' },
				{ id: 2, sender: 'bot', text: 'Hi', timestamp: '9:01 AM' },
			],
		},
		{
			id: 2,
			title: 'Context 2',
			messages: [
				{
					id: 1,
					sender: 'user',
					text: 'How are you?',
					timestamp: '9:02 AM',
				},
				{
					id: 2,
					sender: 'bot',
					text: 'I am good, thanks!',
					timestamp: '9:03 AM',
				},
			],
		},
	],
	currentChatContext: 1,
}

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setCurrentChatContext: (state, action) => {
			state.currentChatContext = action.payload
		},
		addNewMessage: (state, action) => {
			const { contextID, message } = action.payload
			const chatIndex = state.chatContexts.findIndex(
				(chat) => chat.id === contextID
			)

			if (chatIndex !== -1) {
				const updatedChatContext = {
					...state.chatContexts[chatIndex],
					messages: [
						...state.chatContexts[chatIndex].messages,
						message,
					],
				}

				const updatedChatContexts = [
					...state.chatContexts.slice(0, chatIndex),
					updatedChatContext,
					...state.chatContexts.slice(chatIndex + 1),
				]

				return {
					...state,
					chatContexts: updatedChatContexts,
				}
			}

			return state
		},
		setNewChat: (state, action) => {
			const { contextID, newChat } = action.payload
			state.chatContexts.push(newChat)
			console.log(state.chatContexts)
		},
	},
})

export const { setCurrentChatContext, addNewMessage, setNewChat } =
	chatSlice.actions

export default chatSlice.reducer
