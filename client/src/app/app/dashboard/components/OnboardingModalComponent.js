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
} from '@chakra-ui/react'

import { useEffect, useRef, useState } from 'react'
import { useColors } from '@/utils/colors'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { connectPlatform } from '@/api'
import { useQueryClient } from '@tanstack/react-query'
import {
	DriveIcon,
	LinkIcon,
	NotionIcon,
	PockketIcon,
	RedditIcon,
} from '@/icons'
import mixpanel from 'mixpanel-browser'
import isValidHttpUrl from '@/utils/valid-http-check'
import { useScrapeLink, useUploadDoc, useUserData } from '@/app/query-hooks'

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

	const uploadRef = useRef(null)
	const toast = useToast()
	const queryClient = useQueryClient()
	const { data, isLoading } = useUserData()

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

		if (
			!userData?.userMetadata?.subscription_status &&
			docData?.length >= 5
		) {
			onPaymentModalOpen()
			toast({
				title: 'More than 5 files upload are paid',
				description: 'Please upgrade your plan.',
				position: 'top',
				variant: 'subtle',
				status: 'info',
				duration: 3000,
			})
			event.target.value = ''
			return
		}
		if (
			!userData?.userMetadata?.subscription_status &&
			file &&
			file.size > 10 * 1024 * 1024
		) {
			onPaymentModalOpen()
			toast({
				title: 'Files larger than 10MB are paid',
				description: 'Please select a file less than 10MB.',
				position: 'top',
				variant: 'subtle',
				status: 'info',
				duration: 3000,
			})
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
			<ModalContent h={'80vh'} margin={['10px', 'auto']} bg={base800}>
				<ModalCloseButton
					cursor={'pointer'}
					onClick={onCloseOnboarding}
				/>
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
							<Heading
								fontSize={['xl', '2xl']}
								fontWeight={'400'}
							>
								welcome to mygptbrain! please...
							</Heading>
							<Box
								border={'1px solid black'}
								borderColor={text}
								opacity={0.2}
								w={'100%'}
								m={'auto'}
								my={2}
							></Box>

							<Grid
								gridTemplateColumns={'1fr 1fr'}
								gridTemplateRows={'1fr 1fr'}
								gap={5}
							>
								{' '}
								{!data?.auth?.reddit_id && (
									<PlatformCard
										title='reddit'
										color='rgba(255, 67, 0, 1)'
										icon={
											<RedditIcon
												fill={'rgba(255, 255, 255, 1)'}
											/>
										}
									/>
								)}
								{!data?.auth?.google_id && (
									<PlatformCard
										title='drive'
										color='rgba(255, 208, 75, 1)'
										icon={
											<DriveIcon
												fill={'rgba(255, 255, 255, 1)'}
											/>
										}
									/>
								)}
								{!data?.auth?.notion_id && (
									<PlatformCard
										title='notion'
										color='rgba(55, 53, 48, 1)'
										icon={
											<NotionIcon
												fill={'rgba(255, 255, 255, 1)'}
											/>
										}
										disabled='true'
									/>
								)}
								{!data?.auth?.pocket_id && (
									<PlatformCard
										title='pocket'
										color='rgba(213, 77, 87, 1)'
										icon={
											<PockketIcon
												fill={'rgba(255, 255, 255, 1)'}
											/>
										}
									/>
								)}
							</Grid>

							<Box position='relative' py={6} fontSize={'18px'}>
								<Divider
									borderColor={text}
									opacity={0.2}
									rounded={'md'}
									borderWidth={'1px'}
								/>
								<AbsoluteCenter px='4' bg={base800}>
									or
								</AbsoluteCenter>
							</Box>

							<Grid
								gap={5}
								templateColumns={'1fr 1fr'}
								w={'80%'}
								m='auto'
							>
								<Input
									type='file'
									ref={uploadRef}
									onChange={(e) => handleFileChange(e)}
									display={'none'}
								/>

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
									onClick={() => uploadRef.current.click()}
								>
									upload document
									{uploadDocIsLoading ? (
										<Spinner />
									) : (
										<AiOutlineCloudUpload />
									)}
								</Button>
								<InputGroup
									border={'0px solid transparent'}
									h={'100%'}
								>
									<Input
										h={'100%'}
										pr={12}
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
														docData?.length < 5
													) {
														scrapeLinkMutate()
													} else {
														onPaymentModalOpen()
														toast({
															title: 'More than 5 files/link upload are paid',
															description:
																'Please upgrade your plan.',
															position: 'Top',
															variant: 'subtle',
															status: 'info',
															duration: 3000,
														})
														setLink('')
													}
												} else {
													toast({
														title: 'Invalid Link',
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

const PlatformCard = ({ title, color, icon }) => {
	const { data } = useUserData()

	return (
		<Flex
			flexDir={'column'}
			gap={2}
			cursor={'pointer'}
			onClick={() =>
				connectPlatform({
					platform: title,
					profileId: data?.profile_id,
				})
			}
		>
			<Text fontSize={'xl'} fontWeight={'400'}>
				{title}
			</Text>
			<Flex
				alignItems={'center'}
				bg={color}
				gap={[10, 20]}
				color={'white'}
				rounded={'5px'}
				p={2.5}
				justifyContent={'space-between'}
			>
				<Text>connect</Text>
				{icon}
			</Flex>
		</Flex>
	)
}

export default OnboardingModal
