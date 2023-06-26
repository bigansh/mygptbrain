import { createContext, useContext, useState } from 'react'

const ThreadsContext = createContext()

export const ThreadsProvider = ({ children }) => {
	const [threads, setThreads] = useState([])

	return (
		<ThreadsContext.Provider value={{ threads, setThreads }}>
			{children}
		</ThreadsContext.Provider>
	)
}

export const useThreads = () => {
	const data = useContext(ThreadsContext)
	return data
}
