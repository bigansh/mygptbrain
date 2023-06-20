import React from 'react'
import UploadSvg from '../assets/UploadSvg'

const UploadDocument = ({
	handleFileExplorerOpen,
	fileInputRef,
	handleFileUpload,
}) => {
	return (
		<div className='w-2/3 md:w-full'>
			<button
				className='bg-[#DFE8FF] bg-opacity-50 hover:bg-[#DFE8FF] hover:bg-opacity-100  py-3 px-5 rounded flex items-center justify-between space-x-4 w-full'
				onClick={handleFileExplorerOpen}
			>
				<div className='text-black md:text-lg lg:text-xl'>
					upload Document
				</div>
				<UploadSvg />
			</button>
			<input
				ref={fileInputRef}
				type='file'
				className='hidden'
				onChange={handleFileUpload}
			/>
		</div>
	)
}

export default UploadDocument
