import { ChatIconSvg } from '@/app/assets'
import {
	setCurrentChatContext,
	setCurrentChats,
} from '@/store/reducers/chatReducer'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SingleThread = ({ chatState, maxHeight }) => {
	const dispatch = useDispatch()

	const [contextID, setContextID] = useState(null)
	const handleClick = (itemID) => {
		setContextID(itemID)
	}

	const currentChatContext = useSelector(
		(state) => state.chat.currentChatContext
	)

	useEffect(() => {
		if (contextID) {
			dispatch(setCurrentChatContext(contextID))
		}
	}, [dispatch, contextID])

	return (
		<div className={`max-h-${maxHeight} overflow-y-scroll w-full`}>
			{chatState.map((item, index) => (
				<button
					key={item.id}
					className={`flex items-center justify-start space-x-6 w-full hover:bg-[#DFE8FF] px-2 py-2 rounded-lg cursor-pointer max-w-xs text-xl truncate ${
						currentChatContext === item.id ? 'bg-[#DFE8FF]' : ''
					}`}
					onClick={() => handleClick(item.id)}
				>
					<div>
						<ChatIconSvg />
					</div>
					<div className='max-w-xs text-xl truncate'>
						{item.title}
					</div>
				</button>
			))}
		</div>
	)
}

export default SingleThread
