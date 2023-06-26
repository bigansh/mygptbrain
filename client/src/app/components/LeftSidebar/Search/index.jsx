import useChatSearch from '@/hooks/useChatSearch'
import React from 'react'
import { GoSearch } from 'react-icons/go'
const Search = ({ searchTerm, setSearchTerm }) => {
	console.log(searchTerm, 'search')
	return (
		<div>
			<div className='flex items-start p-4 bg-[#DFE8FF80] rounded-lg justify-between'>
				<input
					type='text'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder='search threads'
					className='border-0 py-0 text-xl bg-opacity-50 w-4/5 bg-transparent focus:shadow-none focus-within:shadow-none'
				/>

				<button className='bg-[#DFE8FF80] bg-opacity-50 fill-black h-full focus:outline-none '>
					<GoSearch fontSize={30}/>
				</button>
			</div>
		</div>
	)
}

export default Search
