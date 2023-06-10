import { useRef, useState } from 'react'
import Modal from './Modal'
import Button from './buttons/Button'
import PasteLink from './buttons/PasteLink'
import UploadDocument from './buttons/UploadDocument'

const OnboardingComponent = () => {
	const [link, setLink] = useState('')
	const [file, setFile] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(true)
	const fileInputRef = useRef(null)

	const handleLinkChange = (e) => {
		setLink(e.target.value)
	}

	const handleFileUpload = (e) => {
		const selectedFile = e.target.files[0]
		setFile(selectedFile)
	}

	const handleButtonClick = () => {
		setIsModalOpen(true)
	}

	const handleFileExplorerOpen = () => {
		fileInputRef.current.click()
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	return (
		<div className='flex flex-col items-center justify-center h-full'>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				{/* <div className="flex items-end justify-end">
          <button
            className="flex gap-2 text-black hover:bg-red-600 font-bold py-2 px-4 rounded "
            onClick={closeModal}>
            <svg
              className="h-12 w-12 inline"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div> */}

				<div className='flex  flex-col items-center md:justify-center py-20 space-y-8 overflow-auto overscroll-auto h-full'>
					<div className='text-2xl md:text-3xl lg:text-4xl text-center'>
						welcome to mygptbrain! please...
					</div>
					<div className='border-t-2 border-black w-11/12 lg:w-1/2' />
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-6 mx-2'>
						<Button
							title='twitter'
							classes='bg-blue-400 hover:bg-blue-500'
						/>
						<Button
							title='reddit'
							classes='bg-red-500 hover:bg-red-600'
						/>
						<Button
							title='notion'
							classes='bg-gray-700 hover:bg-gray-800'
						/>
						<Button
							title='onedrive'
							classes='bg-purple-600 hover:bg-purple-700'
						/>
						<Button
							title='whatsapp'
							classes='bg-yellow-500 hover:bg-yellow-600'
						/>
						<Button
							title='pocket'
							classes='bg-rose-600 hover:bg-rose-700'
						/>
					</div>
					<div className='flex items-center justify-center space-x-4 w-11/12 lg:w-3/5'>
						<div className='border-t-2 border-black w-5/12 lg:w-2/5' />
						<div className='text-xl'>or</div>
						<div className='border-t-2 border-black w-5/12 lg:w-2/5' />
					</div>
					<div className='flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-x-4 lg:space-y-0'>
						<UploadDocument
							handleFileExplorerOpen={handleFileExplorerOpen}
							fileInputRef={fileInputRef}
							handleFileUpload={handleFileUpload}
						/>

						<PasteLink
							link={link}
							handleLinkChange={handleLinkChange}
						/>
					</div>
				</div>
			</Modal>
		</div>
	)
}

export default OnboardingComponent
