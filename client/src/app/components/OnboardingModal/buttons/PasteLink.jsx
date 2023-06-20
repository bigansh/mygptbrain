import React from 'react'
import ClipboardSvg from '../assets/ClipboardSvg'

const PasteLink = ({ link, handleLinkChange }) => {
	return (
		<div className='flex items-center space-x-2  bg-[#DFE8FF] bg-opacity-50 px-5 w-2/3 md:w-full'>
			<input
				type='text'
				value={link}
				onChange={handleLinkChange}
				className=' rounded py-3 w-2/3 bg-transparent text-black  placeholder-black flex-grow focus:outline-none md:text-lg lg:text-xl'
				placeholder='Paste a Link'
			/>

			<ClipboardSvg />
		</div>
	)
}

export default PasteLink
