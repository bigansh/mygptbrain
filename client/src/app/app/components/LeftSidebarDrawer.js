'use client'

import { useColors } from '@/utils/colors'
import {
	Flex,
	Heading,
	Box,
	useColorMode,
	Button,
	useDisclosure,
	Text,
	Spinner,
	Input,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useToast,
	InputRightElement,
	InputGroup,
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'
import { useThreads } from '@/context'

import Search from './Search'
import FunctionalBtn from './FunctionalBtn'
import SettingModal from './SettingModal'
import {
	AddIcon,
	CloudUploadIcon,
	RotateIcon,
	ThreadIcon,
	DocumentIcon,
	LinkIcon,
	Setting,
} from '@/icons'
import isValidHttpUrl from '@/utils/valid-http-check'
import {
	useDocumentsData,
	useScrapeLink,
	useSyncDoc,
	useThreadsData,
	useUploadDoc,
	useUserData,
} from '@/app/query-hooks'
import { useToastManager } from '@/utils/customToasts'

const LeftSideBarDrawer = ({
	isOpenDrawer,
	onCloseDrawer,
	onPaymentModalOpen,
}) => {
	const toast = useToast()
	const [sidebarTopic, setSidebarTopic] = useState('threads')
	const [threadInput, setThreadInput] = useState('')
	const [documentInput, setDocumentInput] = useState('')
	const [link, setLink] = useState('')
	const showToast = useToastManager()
	const {
		isOpen: isOpenSetting,
		onOpen: onOpenSetting,
		onClose: onCloseSetting,
	} = useDisclosure()
	const { isOpen, onToggle, onClose } = useDisclosure()
	const uploadRef = useRef(null)
	const { colorMode, toggleColorMode } = useColorMode()
	const { base, base800, base600, base700, text } = useColors()
	const {
		currentThread,
		setCurrentThread,
		currentDocument,
		setCurrentDocument,
		setCurrentView,
	} = useThreads()

	const { data: userData } = useUserData()

	const { data: threadsData, isLoading: threadsIsLoading } = useThreadsData({
		enabled: !!userData?.profile_id,
		funcArgs: { profile_id: userData?.profile_id },
	})
	const { data: docData, isLoading: docsIsLoading } = useDocumentsData({
		enabled: !!userData?.profile_id,
		funcArgs: { profile_id: userData?.profile_id },
	})

	const { mutate: uploadDocMutate, isLoading: uploadDocIsLoading } =
		useUploadDoc({
			onSuccess: (data) => {
				setCurrentDocument(data?.document_id)
				setCurrentView('document')
			},
		})

	const { mutate: syncDocMutate, isLoading: syncDocIsLoading } = useSyncDoc(
		() => onToggle()
	)

	const { mutate: scrapeLinkMutate, isLoading: scrapeLinkIsLoading } =
		useScrapeLink({
			link,
			onSuccess: () => {
				onToggle()
				setLink('')
			},
		})

	const handleFileChange = (event) => {
		const file = event.target.files[0]
		console.log(userData?.userMetadata?.subscription_status ? true : false)
		// Check for subscription status and number of documents
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
		onToggle()
	}
	// UI funcs

	const filteredThreads = threadsData
		?.filter((e) =>
			e.chat_name.toLowerCase().includes(threadInput.toLowerCase())
		)
		.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
	const filteredDocuments = docData
		?.filter((e) =>
			e.heading?.toLowerCase().includes(documentInput.toLowerCase())
		)
		.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
	return (
		<Drawer
			isOpen={isOpenDrawer}
			placement='left'
			//initialFocusRef={firstField}
			onClose={onCloseDrawer}
			bg={base}
		>
			<DrawerOverlay />
			<DrawerContent bg={base}>
				<DrawerCloseButton zIndex={100} />
				{sidebarTopic == 'threads' && (
					<Flex flexDir={'column'} gap={2} p={6}>
						<Heading fontSize={'2xl'} fontWeight={'400'}>
							threads
						</Heading>
						<Box
							borderTop='2px'
							borderColor='black.900'
							w={'100%'}
						></Box>

						<Search
							title='search threads'
							searchTerm={threadInput}
							setSearchTerm={setThreadInput}
						/>
						<FunctionalBtn
							title='new thread'
							cursor={'pointer'}
							onClick={() => {
								if (
									!userData?.userMetadata
										?.subscription_status &&
									threadsData?.filter(
										(item) =>
											item?.preferences?.document_id ==
											null
									)?.length >= 2
								) {
									onPaymentModalOpen()
									showToast('THREADS_LIMIT_REACHED')
								} else {
									setCurrentThread('new')
								}
								setCurrentView('chat')
								onCloseDrawer()
							}}
							icon={<AddIcon fill={text} />}
						/>
						<Box
							borderTop='2px'
							borderColor='black.900'
							w={'100%'}
						></Box>
					</Flex>
				)}

				{sidebarTopic == 'threads' &&
					(threadsIsLoading ? (
						<Spinner m={'auto'} mt={4} />
					) : (
						<Flex
							flexDir={'column'}
							gap={2}
							px={6}
							//maxH={'400px'}
							overflowY='auto'
							overflowX='hidden'
						>
							{filteredThreads
								?.filter(
									(item) =>
										item?.preferences?.document_id == null
								)
								?.map((item) => (
									<Button
										display={'grid'}
										gridTemplateColumns={'24px 1fr'}
										justifyContent={'flex-start'}
										key={item.chat_id}
										background={
											currentThread === item.chat_id
												? base700
												: base800
										}
										_hover={{ background: base700 }}
										cursor={'pointer'}
										onClick={() => {
											setCurrentThread(item.chat_id)
											setCurrentView('chat')
											onCloseDrawer()
										}}
										py={4}
										px='10px'
										gap={2}
										fontWeight={'400'}
										alignContent={'center'}
									>
										<ThreadIcon fill={text} />
										<Text textAlign={'initial'} isTruncated>
											{item.chat_name}
										</Text>
									</Button>
								))}
						</Flex>
					))}
				{sidebarTopic == 'documents' && (
					<Flex flexDir={'column'} gap={2} p={6} pos={'relative'}>
						<Heading fontSize={'2xl'} fontWeight={'400'}>
							documents
						</Heading>
						<Box
							borderTop='2px'
							borderColor='black.900'
							w={'100%'}
						></Box>

						<Search
							title='search documents'
							searchTerm={documentInput}
							setSearchTerm={setDocumentInput}
						/>
						<Popover
							placement='bottom-start'
							isOpen={isOpen}
							matchWidth
							returnFocusOnClose={false}
							onClose={onClose}
						>
							<PopoverTrigger>
								<Button
									cursor={'pointer'}
									onClick={onToggle}
									_hover={{ bg: base600 }}
									bg={base700}
									w={'100%'}
									justifyContent={'space-between'}
									borderBottomRadius={isOpen && '0px'}
									fontWeight={'400'}
									isTruncated
								>
									<Text textAlign={'initial'} isTruncated>
										new document
									</Text>
									{uploadDocIsLoading ||
									syncDocIsLoading ||
									scrapeLinkIsLoading ? (
										<Spinner fill={text} />
									) : (
										<AddIcon fill={text} />
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent
								boxShadow={'0px'}
								mt={'-0.5rem'}
								borderTopRadius={'0px'}
								borderTop={`1px solid ${text}`}
								background={base700}
								w={'100%'}
								style={{ 'backdrop-filter': 'blur(5px)' }}
							>
								<FunctionalBtn
									title={'upload document'}
									cursor={'pointer'}
									onClick={() => {
										uploadRef.current.click()
									}}
									icon={
										uploadDocIsLoading ? (
											<Spinner />
										) : (
											<CloudUploadIcon fill={text} />
										)
									}
								/>
								<FunctionalBtn
									title='sync documents'
									cursor={'pointer'}
									onClick={() => {
										syncDocMutate()
									}}
									icon={
										syncDocIsLoading ? (
											<Spinner />
										) : (
											<RotateIcon fill={text} />
										)
									}
								/>
								<InputGroup border={'0px solid transparent'}>
									<Input
										py={2}
										pr={12}
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
															title: 'limit reached',
															description:
																'please upgrade your plan',
															position: 'Top',
															variant: 'subtle',
															status: 'info',
															duration: 3000,
														})
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
											} else {
												console.log('')
											}
										}}
										background={base700}
										_hover={{ background: base700 }}
									/>
									<InputRightElement
										mr={2}
										ml={2}
										display={'flex'}
										justifyContent={'center'}
										alignItems={'center'}
									>
										{scrapeLinkIsLoading ? (
											<Spinner />
										) : (
											<LinkIcon fill={text} />
										)}
									</InputRightElement>
								</InputGroup>
								<Input
									type='file'
									ref={uploadRef}
									onChange={(e) => handleFileChange(e)}
									display={'none'}
								/>
							</PopoverContent>
						</Popover>
						<Box
							borderTop='2px'
							borderColor='black.900'
							w={'100%'}
						></Box>
					</Flex>
				)}
				{sidebarTopic == 'documents' &&
					(docsIsLoading ? (
						<Spinner m={'auto'} mt={4} />
					) : (
						<Flex
							flexDir={'column'}
							gap={2}
							px={6}
							overflowY='auto'
							overflowX='hidden'
						>
							{filteredDocuments?.map((item) => (
								<Button
									display={'grid'}
									gridTemplateColumns={'24px 1fr'}
									justifyContent={'flex-start'}
									key={item.document_id}
									background={
										currentDocument === item.document_id
											? base700
											: base800
									}
									_hover={{ background: base700 }}
									cursor={'pointer'}
									onClick={() => {
										setCurrentDocument(item.document_id)
										setCurrentView('document')
										onCloseDrawer()
									}}
									py={4}
									px='10px'
									gap={2}
									fontWeight={'400'}
									alignContent={'center'}
								>
									<DocumentIcon fill={text} />
									<Text textAlign={'initial'} isTruncated>
										{item?.heading}
									</Text>
								</Button>
							))}
						</Flex>
					))}
				<Box
					borderTop='2px'
					borderColor='black.900'
					w={'100%'}
					px={2}
					pt={4}
					mt={'auto'}
				></Box>
				<Flex flexDir={'column'} gap={4} p={6} pt={4}>
					<Flex alignItems={'center'}>
						<Heading fontSize={'2xl'} fontWeight={'400'}>
							{colorMode === 'light' ? 'dark mode' : 'light mode'}
						</Heading>
						<Button
							h={'auto'}
							cursor={'pointer'}
							onClick={toggleColorMode}
							bg={'transparent'}
							ml={'auto'}
							_hover={{ bg: 'transparent' }}
						>
							{colorMode === 'light' ? (
								<HiOutlineMoon
									strokeWidth={1.2}
									fontSize={24}
								/>
							) : (
								<HiOutlineSun strokeWidth={1.5} fontSize={24} />
							)}
						</Button>
					</Flex>
					<Flex alignItems={'center'}>
						<Heading
							fontSize={'2xl'}
							fontWeight={'400'}
							cursor={'pointer'}
							className='document'
							onClick={() => {
								setSidebarTopic(
									sidebarTopic !== 'documents'
										? 'documents'
										: 'threads'
								)
								if (sidebarTopic === 'documents') {
									setCurrentView('chat')
								}
							}}
						>
							{sidebarTopic !== 'documents'
								? 'documents'
								: 'threads'}
						</Heading>
						<Button
							h={'auto'}
							cursor={'pointer'}
							bg={'transparent'}
							onClick={() => {
								setSidebarTopic(
									sidebarTopic !== 'documents'
										? 'documents'
										: 'threads'
								)
								if (sidebarTopic === 'documents') {
									setCurrentView('chat')
								}
							}}
							ml={'auto'}
							_hover={{ bg: 'transparent' }}
						>
							{sidebarTopic !== 'documents' ? (
								<DocumentIcon fill={text} />
							) : (
								<ThreadIcon fill={text} />
							)}
						</Button>
					</Flex>
					<Flex alignItems={'center'}>
						<Heading
							fontSize={'2xl'}
							fontWeight={'400'}
							cursor={'pointer'}
							onClick={onOpenSetting}
						>
							settings
						</Heading>
						<Button
							h={'auto'}
							cursor={'pointer'}
							bg={'transparent'}
							onClick={onOpenSetting}
							ml={'auto'}
							_hover={{ bg: 'transparent' }}
						>
							<Setting fill={text} />
						</Button>
					</Flex>
				</Flex>

				<SettingModal
					isOpenSetting={isOpenSetting}
					onCloseSetting={onCloseSetting}
					onPaymentModalOpen={onPaymentModalOpen}
				/>
			</DrawerContent>
		</Drawer>
	)
}

export default LeftSideBarDrawer
