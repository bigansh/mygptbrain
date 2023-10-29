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
	AiOutlineMenu,
	AiOutlinePlus,
} from 'react-icons/ai'
import { connectPlatform, getUser } from '@/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
	DriveIcon,
	LinkIcon,
	NotionIcon,
	PockketIcon,
	RedditIcon,
} from '@/icons'
import mixpanel from 'mixpanel-browser'
import { useRouter } from 'next/navigation'
import RightSideBarDrawer from './components/RightSideBarDrawer'
import isValidHttpUrl from '@/utils/valid-http-check'
import {
	useScrapeLink,
	useThreadData,
	useUploadDoc,
	useUserData,
} from '@/app/query-hooks'
import { TourProvider } from '@reactour/tour'

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL, {
	track_pageview: true,
	persistence: 'localStorage',
})
const Dashboard = () => {
	const router = useRouter()
	const toast = useToast()
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

	const { data: threadData } = useThreadData({
		currentThread,
		enabled: currentThread !== '' && currentThread !== 'new' ? true : false,
	})

	useEffect(() => {
		if (!localStorage.getItem('x-session-token')) {
			toast({
				title: 'No auth token found',
				position: 'top',
				variant: 'solid',
				status: 'success',
				duration: 3000,
			})
			router.push('/onboarding/signup')
		}
		if (currentView == 'document') {
			setIsSidebarOpen(false)
		}
	}, [currentView])
	const steps = [
		{
			selector: '.threads',
			content:
				'This is the threads section. You can create new threads here.',
		},
		{
			selector: '.documents',
			content:
				'This is the documents section. You can view and documents here.',
		},
		{
			selector: '.documentadd',
			content: 'Click here to add a new document',
			highlightedSelectors: ['.documentadd'],
			mutationObservables: ['#documentadd'],
		},
		// ...
	]

	return (
		<TourProvider
			styles={{
				popover: (base) => ({
					...base,
					borderRadius: 4,
					backgroundColor: base800,
					textColor: text,
				}),
				maskWrapper: (base) => ({
					...base,
					color: base700,
				}),

				badge: (base) => ({ ...base, color: 'blue' }),
			}}
			steps={steps}
		>
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
							<Text maxW={'60%'} isTruncated fontSize={'md'}>
								{threadData[0]?.chat_name}
							</Text>
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
		</TourProvider>
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
	const { data, isLoading } = useUserData()

	useEffect(() => {
		if (localStorage.getItem('modal-display') == 'true') {
			onCloseOnboarding()
		} else {
			onOpenOnboarding()
		}
		localStorage.setItem('modal-display', true)
	}, [])

	const { mutate: uploadDocMutate, isLoading: uploadDocIsLoading } =
		useUploadDoc()
	const handleFileChange = (event) => {
		const file = event.target.files[0]

		if (file && file.size > 10 * 1024 * 1024) {
			// 10MB in bytes
			toast({
				title: 'File is too large',
				description: 'Please select a file less than 10MB.',
				position: 'top',
				variant: 'solid',
				status: 'error',
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
