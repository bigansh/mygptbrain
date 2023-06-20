import { debounce } from 'lodash'
import { useMemo, useState } from 'react'

const useChatSearch = ({ chatTitles }) => {
	const [searchTerm, setSearchTerm] = useState('')
	const handleSearch = (value) => {
		setSearchTerm(value)
	}

	const debouncedSearch = useMemo(
		() =>
			debounce((value) => {
				setSearchTerm(value)
			}, 300),
		[]
	)

	const filteredChats = useMemo(() => {
		const lowerCaseSearchTerm = searchTerm.toLowerCase()
		// return chatTitles.filter((chat) =>
		// 	chat.toLowerCase().includes(lowerCaseSearchTerm)
		// )
	}, [chatTitles, searchTerm])

	return {
		searchTerm,
		handleSearch,
		debouncedSearch,
		filteredChats,
	}
}

export default useChatSearch
