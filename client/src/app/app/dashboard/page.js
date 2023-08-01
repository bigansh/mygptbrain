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
	useDisclosure,
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
import { BsLayoutSidebarInsetReverse } from 'react-icons/bs'
import {
	ChatWrapper,
	DocumentWrapper,
	LeftSidebar,
	RightSideBar,
} from './components'
import { useColors } from '@/utils/colors'
import { useThreads } from '@/context'
import {
	AiOutlineCloudUpload,
	AiOutlineLink,
	AiOutlineMenu,
	AiOutlinePlus,
} from 'react-icons/ai'
import { connectPlatform, getUser, scrapeLink, uploadDoc } from '@/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	AddIcon,
	DriveIcon,
	NotionIcon,
	PockketIcon,
	RedditIcon,
} from '@/icons'
import mixpanel from 'mixpanel-browser'
import { useRouter } from 'next/navigation'
import RightSideBarDrawer from './components/RightSideBarDrawer'

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL, {
	track_pageview: true,
	persistence: 'localStorage',
})
const Dashboard = () => {
	const router = useRouter()

	const [platformModal, setPlatformModal] = useState(false)
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const {
		isOpen: isOpenDrawer,
		onOpen: onOpenDrawer,
		onClose: onCloseDrawer,
	} = useDisclosure()

	const {
		threads,
		setThreads,
		currentThread,
		setCurrentThread,

		currentView,
		setCurrentView,
	} = useThreads()
	const { data, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
		onSuccess: (data) => {
			mixpanel.identify(data?.profile_id)
		},
	})

	const { base, base800, base700, text } = useColors()
	const {
		isOpen: isOpenOnboarding,
		onOpen: onOpenOnboarding,
		onClose: onCloseOnboarding,
	} = useDisclosure({
		defaultIsOpen: false,
	})

	const { data: threadData, isLoading: threadIsLoading } = useQuery({
		queryKey: ['threads', currentThread],
	})

	console.log('threadData', threadData)

	useEffect(() => {
		if (!localStorage.getItem('x-session-token')) {
			toast({
				title: 'No auth token found',
				position: 'top',
				variant: 'left-accent',
				status: 'success',
				duration: 3000,
			})
			router.push('/onboarding/signup')
		}
		if (currentView == 'document') {
			setIsSidebarOpen(false)
		}
	}, [currentView])

	return (
		<Flex
			w={'100vw'}
			maxW={'100vw'}
			h={'100vh'}
			color={text}
			pos={'relative'}
		>
			<Box
				display={['flex', 'none']}
				w={'100%'}
				h={'50px'}
				pos={'absolute'}
				top={0}
				left={0}
				p={'20px'}
				bg={base}
				borderBottom={'1px solid #2c2c2c'}
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				<AiOutlineMenu onClick={onOpenDrawer} />
				{currentThread !== 'new' &&
					currentView == 'chat' &&
					threadData && (
						<Text maxW={'60%'} isTruncated fontSize={'md'}>{threadData[0]?.chat_name}</Text>
					)}
				<AiOutlinePlus
					onClick={() => {
						setCurrentThread('new')
						setCurrentView('chat')
					}}
				/>
			</Box>
			<RightSideBar />
			{currentView == 'chat' ? (
				<ChatWrapper isSidebarOpen={isSidebarOpen} />
			) : (
				<DocumentWrapper isSidebarOpen={isSidebarOpen} />
			)}
			<LeftSidebar
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>
			{currentView == 'chat' && currentThread !== 'new' && (
				<Box
					cursor={'pointer'}
					p={['8px', '10px']}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					position={'absolute'}
					right={'0'}
					bottom={['50px', 0]}
					borderLeftRadius={4}
					borderRightRadius={0}
					background={base700}
					display={isSidebarOpen ? 'none' : 'flex'}
				>
					{' '}
					<BsLayoutSidebarInsetReverse fontSize={[22, 24]} />
				</Box>
			)}
			<OnboardingModal
				isOpenOnboarding={isOpenOnboarding}
				onOpenOnboarding={onOpenOnboarding}
				onCloseOnboarding={onCloseOnboarding}
			/>
			<RightSideBarDrawer
				isOpenDrawer={isOpenDrawer}
				onCloseDrawer={onCloseDrawer}
				onOpenDrawer={onOpenDrawer}
			/>
		</Flex>
	)
}

export default Dashboard

const OnboardingModal = ({
	isOpenOnboarding,
	onOpenOnboarding,
	onCloseOnboarding,
}) => {
	const [link, setLink] = useState('')

	const uploadRef = useRef(null)
	const toast = useToast()
	const queryClient = useQueryClient()
	const { data, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	})

	useEffect(() => {
		if (localStorage.getItem('modal-display') == 'true') {
			onCloseOnboarding()
		} else {
			onOpenOnboarding()
		}
		localStorage.setItem('modal-display', true)
	}, [])

	const {
		data: uploadDocData,
		mutate: uploadDocMutate,
		isLoading: uploadDocIsLoading,
	} = useMutation({
		mutationFn: () => uploadDoc(uploadRef.current.files[0]),

		onSuccess: (data) => {
			queryClient.invalidateQueries(['documents'])
			onCloseOnboarding()
			toast({
				title: 'Document uploaded successfully',
				position: 'top',
				variant: 'left-accent',
				status: 'success',
				duration: 3000,
			})
		},
		onError: (error) => {
			console.log(error)
			toast({
				title: 'Error uploading document',
				position: 'top',
				variant: 'left-accent',
				status: 'error',
				duration: 3000,
			})
		},
	})

	const {
		data: scrapeLinkData,
		mutate: scrapeLinkMutate,
		isLoading: scrapeLinkIsLoading,
	} = useMutation({
		mutationFn: () => scrapeLink(link),

		onSuccess: (data) => {
			queryClient.invalidateQueries(['documents'])
			onCloseOnboarding()
			toast({
				title: 'Link scraped successfully',
				position: 'top',
				variant: 'left-accent',
				status: 'success',
				duration: 3000,
			})
		},
		onError: (error) => {
			toast({
				title: 'Error uploading link',
				position: 'top',
				variant: 'left-accent',
				status: 'error',
				duration: 3000,
			})
		},
	})

	const { base, base800, base700, text } = useColors()
	return (
		<Modal
			onClose={onCloseOnboarding}
			size={'6xl'}
			isOpen={isOpenOnboarding}
			isCentered
			bg={base800}
		>
			<ModalOverlay
				backdropFilter='blur(2px)'
				bg='rgba(123, 130, 148, 0.2)'
			/>
			<ModalContent h={'80vh'} bg={base800}>
				<ModalCloseButton
					cursor={'pointer'}
					onClick={onCloseOnboarding}
				/>
				<ModalBody
					w={'60%'}
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
							<Heading fontSize={'2xl'} fontWeight={'400'}>
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
									onChange={() => uploadDocMutate()}
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
										onKeyDown={(e) =>
											e.key === 'Enter'
												? isValidHttpUrl(e.target.value)
													? scrapeLinkMutate()
													: toast({
															title: 'Invalid Link',
															position: 'top',
															variant:
																'left-accent',
															status: 'error',
															duration: 3000,
													  })
												: console.log('')
										}
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
											<AiOutlineLink />
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
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	})

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
				gap={20}
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

function isValidHttpUrl(str) {
	const pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', // fragment locator
		'i'
	)
	return pattern.test(str)
}
