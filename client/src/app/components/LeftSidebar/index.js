'use client'
import { useEffect, useRef, useState } from 'react'
import ThemeSwitcherButton from '../../../lib/ThemeSwitcher'
import Modal from '../Settings'
import Search from './Search'
import SingleThread from './Thread'
import FunctionalBtn from './FunctionalBtn'
import { IoIosSync } from 'react-icons/io'
import { BsPlusLg } from 'react-icons/bs'
import { PiChatsThin } from 'react-icons/pi'
import { IoDocumentTextOutline } from 'react-icons/io5'

const LeftSidebar = () => {
	//const chatState = useSelector((state) => state.chat.chatContexts)
	//const chatTitles = chatState.map((context) => context?.title || [])
	const [sidebarTopic, setSidebarTopic] = useState('threads')
	const [threads, setThreads] = useState([
		{ id: 1, name: 'title 1' },
		{ id: 2, name: 'title 2' },
		{ id: 3, name: 'title 3' },
		{ id: 4, name: 'title 4' },
		{ id: 5, name: 'title 5' },
	])
	const [documents, setDocuments] = useState([
		{ id: 1, name: 'title 1' },
		{ id: 2, name: 'title 2' },
		{ id: 3, name: 'title 3' },
		{ id: 4, name: 'title 4' },
		{ id: 5, name: 'title 5' },
	])
	const [threadInput, setThreadInput] = useState('')
	const [documentInput, setDocumentInput] = useState('')

	// const [collapsed, setCollapsed] = useState(false)

	// const handleToggleCollapse = () => {
	// 	setCollapsed(!collapsed)
	// }
	const filterData = (data, input) =>
		data.filter((e) => e.name.includes(input))

	const filteredThreads = filterData(threads, threadInput)
	const filteredDocuments = filterData(documents, documentInput)

	const [isOpen, setIsOpen] = useState(false)
	const openModal = () => {
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	// const { searchTerm, handleSearch, debouncedSearch, filteredChats } =
	// 	useChatSearch(chatTitles)

	return (
		<div className='transition-all duration-300 h-screen max-h-screen bg-[#F4F7FF] w-full flex flex-col items-start justify-between py-6'>
			{sidebarTopic == 'threads' && (
				<>
					<div className='space-y-4 px-6 w-full'>
						<div className='text-3xl'>{sidebarTopic}</div>
						<hr className='border-t-2 w-full border-black ' />

						<Search
							searchTerm={threadInput}
							setSearchTerm={setThreadInput}
						/>
						<FunctionalBtn
							title='add chat'
							icon={<BsPlusLg fontSize={30} />}
						/>
						<hr className='border-t-2 w-full border-black ' />

						<div className='mx-auto max-h-[50vh] overflow-scroll'>
							<SingleThread
								chatState={filteredThreads}
								icon={
									<PiChatsThin
										fontSize={24}
										width={24}
										height={24}
									/>
								}
							/>
						</div>
					</div>
				</>
			)}

			{sidebarTopic == 'documents' && (
				<>
					<div className='space-y-4 px-6 w-full'>
						<div
							onClick={() =>
								console.log(documentInputRef.current.value)
							}
							className='text-3xl'
						>
							{sidebarTopic}
						</div>
						<hr className='border-t-2 w-full border-black ' />

						<Search
							searchTerm={documentInput}
							setSearchTerm={setDocumentInput}
						/>
						<FunctionalBtn
							title='sync documents'
							icon={<IoIosSync fontSize={30} />}
						/>
						<hr className='border-t-2 w-full border-black' />

						<div className='mx-auto max-h-[50vh] overflow-scroll'>
							<SingleThread
								chatState={filteredDocuments}
								icon={
									<IoDocumentTextOutline
										fontSize={24}
										width={24}
										height={24}
									/>
								}
							/>
						</div>
					</div>
				</>
			)}
			<div className='border-t-4 w-full border-black px-6 space-y-6 pt-8'>
				<div className='flex items-center justify-between'>
					<div className='text-3xl'>dark mode</div>
					<ThemeSwitcherButton />
				</div>

				<div
					className='text-3xl cursor-pointer'
					onClick={() =>
						setSidebarTopic(
							sidebarTopic !== 'documents'
								? 'documents'
								: 'threads'
						)
					}
				>
					{sidebarTopic !== 'documents' ? 'documents' : 'threads'}
				</div>
				<button
					className='text-3xl cursor-pointer flex items-start w-full'
					onClick={openModal}
				>
					settings
					<Modal isOpen={isOpen} onClose={closeModal} title='' />
				</button>
			</div>
		</div>
	)
}

export default LeftSidebar
