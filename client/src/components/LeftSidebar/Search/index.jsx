import useChatSearch from '@/hooks/useChatSearch'
import React from 'react'

const Search = ({ chats }) => {
	const { searchTerm, handleSearch, debouncedSearch, filteredChats } =
		useChatSearch(chats)

	return (
		<div>
			<div className='flex items-start '>
				<input
					type='text'
					value={searchTerm}
					onChange={(e) => debouncedSearch(e.target.value)}
					placeholder='search threads'
					className='py-2 px-4 rounded-l-lg text-xl bg-[#DFE8FF80] bg-opacity-50 w-4/5'
				/>
				{/* <ul className='space-y-4'>
					{filteredChats.map((chat) => (
						<li
							key={chat.id}
							className='bg-white p-4 shadow rounded-md'
						>
							<h3 className='text-lg font-semibold'>{chat}</h3>
							<p className='text-gray-500'>{chat.lastMessage}</p>
						</li>
					))}
				</ul> */}
				<button className='bg-[#DFE8FF80] bg-opacity-50 fill-black  py-2 px-4 rounded-r-lg focus:outline-none '>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-8 h-8 '
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
						/>
					</svg>
				</button>
			</div>
		</div>
	)
}

export default Search
