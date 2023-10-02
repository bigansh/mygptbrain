import { useRef, useState } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'
import { useThreads } from '@/context'
import {
	Flex,
	Heading,
	Box,
	useColorMode,
	Button,
	useDisclosure,
	Text,
	Input,
	Spinner,
	useToast,
	InputGroup,
	InputRightElement,
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@chakra-ui/react'
import Search from './Search'
import FunctionalBtn from './FunctionalBtn'
import SettingModal from './SettingModal'
import { useColors } from '@/utils/colors'
import {
	AddIcon,
	CloudUploadIcon,
	RotateIcon,
	ThreadIcon,
	DocumentIcon,
	LinkIcon,
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

const RightSideBar = () => {
	const { isOpen, onToggle, onClose } = useDisclosure()
	const toast = useToast()
	const [sidebarTopic, setSidebarTopic] = useState('threads')
	const [threadInput, setThreadInput] = useState('')
	const [documentInput, setDocumentInput] = useState('')
	const [link, setLink] = useState('')
	const {
		isOpen: isOpenSetting,
		onOpen: onOpenSetting,
		onClose: onCloseSetting,
	} = useDisclosure()
	const uploadRef = useRef(null)
	const { colorMode, toggleColorMode } = useColorMode()
	const { base800, base600, base700, text } = useColors()
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
		useUploadDoc()

	const handleFileChange = (event) => {
		const file = event.target.files[0]

		if (file && file.size > 10 * 1024 * 1024) {
			toast({
				title: 'File is too large',
				description: 'Please select a file less than 10MB.',
				position: 'top',
				variant: 'solid',
				status: 'error',
				duration: 3000,
			})
			onToggle()
			event.target.value = ''
			return
		}
		console.log(file, 'fole')
		// Invoke the mutation here, passing the file
		uploadDocMutate(file)
		onToggle()
	}
	const { mutate: syncDocMutate, isLoading: syncDocIsLoading } = useSyncDoc(
		() => onToggle()
	)

	const { mutate: scrapeLinkMutate, isLoading: scrapeLinkIsLoading } =
		useScrapeLink({ link, onSuccess: () => onToggle() })

	// UI funcs

	const filteredThreads = threadsData
		?.filter((e) =>
			e.chat_name.toLowerCase().includes(threadInput.toLowerCase())
		)
		.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
	const filteredDocuments = docData
		?.filter((e) =>
			e?.heading?.toLowerCase().includes(documentInput.toLowerCase())
		)
		.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
	return (
		<Flex
			flexDir={'column'}
			background={base800}
			minW={'20vw'}
			maxW={'20vw'}
			maxH={'100vh'}
			display={['none', 'flex']}
		>
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
							setCurrentThread('new')
							setCurrentView('chat')
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
						{filteredThreads?.map((item, index) => (
							<Button
								index={index}
								display={'grid'}
								justifyContent={'flex-start'}
								key={item.chat_id}
								gridTemplateColumns={'24px 1fr'}
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
									//onClose()
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
						trigger='hover'
						
					>
						<PopoverTrigger>
							<Button
								cursor={'pointer'}
								onClick={onToggle}
								_hover={{ bg: base600 }}
								bg={base700}
								w={'100%'}
								justifyContent={'space-between'}
								fontWeight={'400'}
								isTruncated
							>
								<Text textAlign={'initial'} isTruncated>
									new document
								</Text>
								<AddIcon fill={text} />
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
									h={'100%'}
									type='text'
									value={link}
									placeholder='paste a link'
									onChange={(e) => setLink(e.target.value)}
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
														variant: 'left-accent',
														status: 'error',
														duration: 3000,
												  })
											: console.log('')
									}
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
						//maxH={'400px'}
						overflowY='auto'
						overflowX='hidden'
					>
						{filteredDocuments?.map((item, index) => (
							<Button
								index={index}
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
							<HiOutlineMoon fontSize={24} />
						) : (
							<HiOutlineSun fontSize={24} />
						)}
					</Button>
				</Flex>
				<Heading
					fontSize={'2xl'}
					fontWeight={'400'}
					cursor={'pointer'}
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
					{sidebarTopic !== 'documents' ? 'documents' : 'threads'}
				</Heading>
				<Heading
					fontSize={'2xl'}
					fontWeight={'400'}
					cursor={'pointer'}
					onClick={onOpenSetting}
				>
					settings
				</Heading>
			</Flex>

			<SettingModal
				isOpenSetting={isOpenSetting}
				onCloseSetting={onCloseSetting}
			/>
		</Flex>
	)
}

export default RightSideBar
