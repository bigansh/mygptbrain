'use client'

import {
	Button,
	Flex,
	Heading,
	Box,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	Spinner,
	Text,
	Grid,
	Divider,
	AbsoluteCenter,
	Input,
	InputGroup,
	InputRightElement,
	useToast,
	Img,
} from '@chakra-ui/react'

import { useEffect, useRef, useState } from 'react'
import { useColors } from '@/utils/colors'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { connectPlatform } from '@/api'
import { useQueryClient } from '@tanstack/react-query'
import {
	ArrowRightIcon,
	DriveIcon,
	LinkIcon,
	NotionIcon,
	PockketIcon,
	RedditIcon,
} from '@/icons'
import mixpanel from 'mixpanel-browser'
import isValidHttpUrl, { upgradeFunction } from '@/utils/valid-http-check'
import {
	useDocumentsData,
	useScrapeLink,
	useUploadDoc,
	useUserData,
} from '@/app/query-hooks'
import { useToastManager } from '@/utils/customToasts'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { useThreads } from '@/context'

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL, {
	track_pageview: true,
	persistence: 'localStorage',
})

const OnboardingModal = ({
	isOpenOnboarding,
	onOpenOnboarding,
	onCloseOnboarding,
	onPaymentModalOpen,
}) => {
	const [link, setLink] = useState('')
	const showToast = useToastManager()
	const uploadRef = useRef(null)
	const toast = useToast()
	const queryClient = useQueryClient()

	const { data: userData } = useUserData()

	const { data: docData, isLoading } = useDocumentsData({
		enabled: !!userData?.profile_id,
		funcArgs: { profile_id: userData?.profile_id },
	})
	const [currentGif, setCurrentGif] = useState(0)
	const gifs = [
		{
			heading: 'please upload a document to get started',
			description:
				"you need to upload a document to get started. you can't use the app without uploading a document. the below gif will help you understand how to upload a document. ",
			gif: '/upload.gif',
		},
		{
			heading: 'start chatting with your document',
			description:
				'perfect! now that we have a document uploaded, we can start chatting with that document. ask all your queries and the ai will respond. below gif will help you get started.',
			gif: '/chat.gif',
		},
	]
	useEffect(() => {
		// if (localStorage.getItem('tour') == 'true') {

		// }
		if (localStorage.getItem('modal-display') == 'true') {
			onCloseOnboarding()
		} else {
			onOpenOnboarding()
		}
		localStorage.setItem('modal-display', true)
	}, [])

	const { mutate: uploadDocMutate, isLoading: uploadDocIsLoading } =
		useUploadDoc({
			onSuccess: (data) => {
				setCurrentDocument(data?.document_id)
				setCurrentView('document')
			},
		})

	const handleFileChange = (event) => {
		const file = event.target.files[0]
		console.log('here')
		if (
			!userData?.userMetadata?.subscription_status &&
			docData?.length >= 2
		) {
			onPaymentModalOpen()
			showToast('UPLOAD_LIMIT_REACHED')
			onToggle()
			event.target.value = ''
			return
		}

		// Check for file size larger than 10MB
		if (
			!userData?.userMetadata?.subscription_status &&
			file &&
			file.size > 10 * 1024 * 1024
		) {
			onPaymentModalOpen()
			showToast('FILE_TOO_LARGE')
			onToggle()
			event.target.value = ''
			return
		}

		// Check if the uploaded file is an image and payment is false
		if (
			!userData?.userMetadata?.subscription_status &&
			file &&
			file.type.startsWith('image/')
		) {
			onPaymentModalOpen()
			showToast('PAID_IMAGE_UPLOAD')
			onToggle()
			event.target.value = ''
			return
		}

		// Invoke the mutation here, passing the file
		uploadDocMutate(file)
	}
	const { mutate: scrapeLinkMutate, isLoading: scrapeLinkIsLoading } =
		useScrapeLink({
			link,
			onSuccess: () => {
				onCloseOnboarding()
				setLink('')
			},
		})

	const { currentThread, setCurrentThread, currentView, setCurrentView } =
		useThreads()
	const { base, base800, base700, text } = useColors()
	return (
		<Modal
			onClose={onCloseOnboarding}
			size={['xl', '6xl']}
			isOpen={isOpenOnboarding}
			isCentered
			bg={base800}
		>
			<ModalOverlay
				backdropFilter='blur(2px)'
				bg='rgba(123, 130, 148, 0.2)'
			/>
			<ModalContent
				h={['70vh', '80vh']}
				margin={['10px', 'auto']}
				bg={base800}
			>
				{/* <ModalCloseButton
					cursor={'pointer'}
					onClick={onCloseOnboarding}
				/> */}
				<ModalBody
					w={['100%', '60%']}
					m={'auto'}
					display={'flex'}
					alignItems={'center'}
				>
					{isLoading ? (
						<Spinner
							justifyContent={'center'}
							alignItems={'center'}
							margin={'auto'}
						/>
					) : (
						<Flex
							flexDir={'column'}
							alignItems={'stretch'}
							gap={4}
							w={'100%'}
						>
							<Box>
								<Heading
									fontSize={['xl', '2xl']}
									fontWeight={'400'}
								>
									{gifs[currentGif].heading}
								</Heading>
								<Text pt={0} mt={0}>
									{gifs[currentGif].description}
								</Text>
							</Box>

							<Flex
								borderColor={text}
								w={'100%'}
								m={'auto'}
								my={2}
								pos={'relative'}
								h={['200px', '350px']}
								flexDir={'column'}
								justifyContent={'center'}
								alignItems={'center'}
							>
								<Img
									h={['auto', '100%']}
									src={gifs[currentGif].gif}
									alt='Computer man'
								/>
								{currentGif == 1 && (
									<Box
										pos={'absolute'}
										top={['80%', 0]}
										left={[20, -10]}
										display={'flex'}
										h={['auto', '100%']}
										alignItems={'center'}
										onClick={() => setCurrentGif(0)}
										mt={[6, 0]}
									>
										<BsArrowLeft color={text} size={30} />
									</Box>
								)}
								{currentGif == 0 && (
									<Box
										pos={'absolute'}
										top={['80%', 0]}
										right={[20, -10]}
										display={'flex'}
										h={['auto', '100%']}
										alignItems={'center'}
										onClick={() => setCurrentGif(1)}
										mt={[6, 0]}
									>
										<BsArrowRight color={text} size={30} />
									</Box>
								)}
							</Flex>

							<Box
								w={'100%'}
								border={`0.5px solid ${text}`}
								opacity={'40%'}
								my={4}
							></Box>

							{/* <Box position='relative' py={6} fontSize={'18px'}>
								<Divider
									borderColor={text}
									opacity={0.2}
									rounded={'md'}
									borderWidth={'1px'}
								/>
								<AbsoluteCenter px='4' bg={base800}>
									or
								</AbsoluteCenter>
							</Box> */}

							<Grid
								gap={5}
								templateColumns={'1fr 1fr'}
								w={['100%', '80%']}
								display={['flex', 'grid']}
								flexDir={'column'}
								m='auto'
							>
								<Input
									type='file'
									ref={uploadRef}
									onChange={(e) => handleFileChange(e)}
									display={'none'}
								/>

								{currentGif == 0 && (
									<Button
										display={'flex'}
										overflow={'hidden'}
										justifyContent={'space-between'}
										background={base700}
										_hover={{ background: base700 }}
										py={6}
										px='10px'
										gap={2}
										fontWeight={'400'}
										cursor={'pointer'}
										onClick={() =>
											uploadRef.current.click()
										}
									>
										upload document
										{uploadDocIsLoading ? (
											<Spinner />
										) : (
											<AiOutlineCloudUpload />
										)}
									</Button>
								)}
								{currentGif == 1 && (
									<Button
										display={'flex'}
										overflow={'hidden'}
										justifyContent={'space-between'}
										background={base700}
										_hover={{ background: base700 }}
										py={6}
										px='10px'
										gap={2}
										fontWeight={'400'}
										cursor={'pointer'}
										onClick={() => {
											setCurrentView('chat')
											onCloseOnboarding()
											setCurrentThread('new')
										}}
									>
										upload document
										{uploadDocIsLoading ? (
											<Spinner />
										) : (
											<AiOutlineCloudUpload />
										)}
									</Button>
								)}
								<InputGroup
									border={'0px solid transparent'}
									h={'100%'}
								>
									<Input
										h={'100%'}
										pr={12}
										py={2}
										type='text'
										value={link}
										placeholder='paste a link'
										onChange={(e) =>
											setLink(e.target.value)
										}
										_focus={{
											borderColor: isValidHttpUrl(link)
												? 'green'
												: 'red',
										}}
										_focusVisible={{
											borderColor: isValidHttpUrl(link)
												? 'green'
												: 'red',
										}}
										//onChange={e => e.target.val}
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												if (
													isValidHttpUrl(
														e.target.value
													)
												) {
													if (
														userData?.userMetadata
															?.subscription_status ||
														docData?.length < 2
													) {
														scrapeLinkMutate()
													} else {
														onPaymentModalOpen()
														showToast(
															'UPLOAD_LIMIT_REACHED'
														)
														setLink('')
													}
												} else {
													toast({
														title: 'invalid link',
														position: 'top',
														variant: 'left-accent',
														status: 'error',
														duration: 3000,
													})
												}
											}
										}}
										background={base700}
										_hover={{ background: base700 }}
									/>
									<InputRightElement
										h={'100%'}
										display={'flex'}
										justifyContent={'center'}
										alignItems={'center'}
									>
										{scrapeLinkIsLoading ? (
											<Spinner />
										) : (
											<LinkIcon />
										)}
									</InputRightElement>
								</InputGroup>
							</Grid>
						</Flex>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default OnboardingModal
