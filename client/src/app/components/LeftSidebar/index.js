'use client'

import useChatSearch from '@/hooks/useChatSearch'
import {
	addNewMessage,
	createNewChatContext,
	setChatContext,
} from '@/store/reducers/chatReducer'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ThemeSwitcherButton from '../../../lib/ThemeSwitcher'
import Modal from '../Settings'
import AddChatButton from './AddThread'
import Search from './Search'
import SingleThread from './Thread'

const LeftSidebar = () => {
	const chatState = useSelector((state) => state.chat.chatContexts)
	const chatTitles = chatState.map((context) => context?.title || [])

	const [collapsed, setCollapsed] = useState(false)

	const handleToggleCollapse = () => {
		setCollapsed(!collapsed)
	}

	const [isOpen, setIsOpen] = useState(false)
	const openModal = () => {
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	const { searchTerm, handleSearch, debouncedSearch, filteredChats } =
		useChatSearch(chatTitles)

	return (
		<div
			className={`  transition-all duration-300 h-screen bg-[#F4F7FF] w-full flex flex-col items-start justify-between py-6 ${
				collapsed ? 'hidden' : 'w-full'
			}`}
		>
			<div className='space-y-4 px-6'>
				{/* <div>
         
        </div> */}
				{/* <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow m-4"
          onClick={handleToggleCollapse}>
          {collapsed ? "Expand" : "Collapse"}
        </button> */}

				<div className='text-4xl'>threads</div>
				<hr className='border-t-2 border-black ' />
				<Search
					chats={chatTitles}
					searchTerm={searchTerm}
					debouncedSearch={debouncedSearch}
				/>
				<AddChatButton />
				<hr className='border-t-2 border-black ' />
				<div className='overscroll-y-contain h-80 overflow-auto mx-auto'>
					<SingleThread chatState={chatState} maxHeight={64} />
				</div>
			</div>
			<div className='border-t-8 w-full border-black px-12 space-y-4 pt-8'>
				<div className='flex items-center justify-between hover:bg-[#DFE8FF]  cursor-pointer px-3 py-2 rounded-lg'>
					<div className='text-3xl'>dark mode</div>
					<ThemeSwitcherButton />
				</div>
				<div className='text-3xl px-3 py-2 rounded-lg hover:bg-[#DFE8FF]  cursor-pointer'>
					documents
				</div>
				<button
					className='text-3xl px-3 py-2 rounded-lg hover:bg-[#DFE8FF]  cursor-pointer flex items-start w-full'
					onClick={openModal}
				>
					Settings
					<Modal isOpen={isOpen} onClose={closeModal} title=''>
						{/* <p>This is the content of the modal.</p> */}
					</Modal>
				</button>
			</div>
		</div>
	)
}

export default LeftSidebar
