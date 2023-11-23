import { createContext, useContext, useState } from 'react'

const ThreadsContext = createContext()

export const ThreadsProvider = ({ children }) => {
	const [currentThread, setCurrentThread] = useState('new')
	const [currentDocument, setCurrentDocument] = useState('')
	const [currentView, setCurrentView] = useState('chat')
	const [sidebarTopic, setSidebarTopic] = useState('threads')
	return (
		<ThreadsContext.Provider
			value={{
				currentThread,
				setCurrentThread,
				currentDocument,
				setCurrentDocument,
				currentView,
				setCurrentView,
				sidebarTopic,
				setSidebarTopic,
			}}
		>
			{children}
		</ThreadsContext.Provider>
	)
}

export const useThreads = () => {
	const data = useContext(ThreadsContext)
	return data
}
