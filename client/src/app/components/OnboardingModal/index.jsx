import { useRef, useState } from 'react'
import Modal from './Modal'
import Button from './buttons/Button'
import PasteLink from './buttons/PasteLink'
import UploadDocument from './buttons/UploadDocument'
import { getUser } from '@/api'
import { useQuery } from '@tanstack/react-query'
import Loader from '../Loader'

const OnboardingComponent = ({ isOpen, setOpen }) => {
	const [link, setLink] = useState('')
	const [file, setFile] = useState(null)

	const fileInputRef = useRef(null)

	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	})
	// const { google_id, notion_id, pocket_id, reddit_id, twitter_id } =
	// 	data?.auth

	const handleLinkChange = (e) => {
		setLink(e.target.value)
	}

	const handleFileUpload = (e) => {
		const selectedFile = e.target.files[0]
		setFile(selectedFile)
	}

	const handleFileExplorerOpen = () => {
		fileInputRef.current.click()
	}

	return (
		<div className='flex flex-col items-center justify-center h-full'>
			<Modal isOpen={isOpen} onClose={() => setOpen(false)}>
				{isLoading ? (
					<Loader />
				) : (
					<div className='flex  flex-col items-center md:justify-center py-20 space-y-8 overflow-auto overscroll-auto h-full'>
						<div className='text-xl md:text-3xl lg:text-4xl text-center'>
							welcome to mygptbrain! please...
						</div>
						<div className='border-t-2 border-black w-11/12 lg:w-1/2' />
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-between gap-10 mx-2'>
							{!data?.auth?.twitter_id && (
								<Button
									title='twitter'
									classes='bg-blue-400 hover:bg-blue-500'
								/>
							)}
							{!data?.auth?.reddit_id && (
								<Button
									title='reddit'
									classes='bg-red-500 hover:bg-red-600'
								/>
							)}
							{!data?.auth?.notion_id && (
								<Button
									title='notion'
									classes='bg-gray-700 hover:bg-gray-800'
								/>
							)}
							{!data?.auth?.google_id && (
								<Button
									title='onedrive'
									classes='bg-purple-600 hover:bg-purple-700'
								/>
							)}
							{/* <Button
							title='whatsapp'
							classes='bg-yellow-500 hover:bg-yellow-600'
						/> */}
							{!data?.auth?.pocket_id && (
								<Button
									title='pocket'
									classes='bg-rose-600 hover:bg-rose-700'
								/>
							)}
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
				)}
			</Modal>
		</div>
	)
}

export default OnboardingComponent
