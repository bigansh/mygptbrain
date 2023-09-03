import { useRef, useState } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'
import { useThreads } from '@/context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getDoc, getUser, readChat, syncDoc, uploadDoc } from '@/api'
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
} from '@/icons'
import { logtail } from '@/app/providers'

const RightSideBar = () => {
	const queryClient = useQueryClient()
	const toast = useToast()
	const [sidebarTopic, setSidebarTopic] = useState('threads')
	const [threadInput, setThreadInput] = useState('')
	const [documentInput, setDocumentInput] = useState('')
	const {
		isOpen: isOpenSetting,
		onOpen: onOpenSetting,
		onClose: onCloseSetting,
	} = useDisclosure()
	const uploadRef = useRef(null)
	const { colorMode, toggleColorMode } = useColorMode()
	const { base, base800, base700, text } = useColors()
	const {
		threads,
		setThreads,
		currentThread,
		setCurrentThread,
		documents,
		setDocuments,
		currentDocument,
		setCurrentDocument,
		currentView,
		setCurrentView,
	} = useThreads()

	const { data: userData } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	})

	const { data: threadsData, isLoading: threadsIsLoading } = useQuery({
		queryKey: ['threads'],
		queryFn: () => readChat({ profile_id: userData?.profile_id }),
		enabled: userData?.profile_id ? true : false,
		//placeholderData: [{ chat_id: 1, chat_name: 'title 1' }],
		onError: (error) => {
			logtail.info('Error getting thread', error)
			logtail.flush()
			logtail
		},
	})

	const { data: docData, isLoading: docsIsLoading } = useQuery({
		queryKey: ['documents'],
		queryFn: () => getDoc({ profile_id: userData?.profile_id }),
		enabled: userData?.profile_id ? true : false,
		//placeholderData: [{ document_id: 1, heading: 'title 1' }],
		onError: (error) => {
			logtail.info('Error getting document', error)
			logtail.flush()
		},
	})

	const {
		data,
		mutate: uploadDocMutate,
		isLoading: uploadDocIsLoading,
	} = useMutation({
		mutationFn: () => uploadDoc(uploadRef.current.files[0]),

		onSuccess: (data) => {
			queryClient.invalidateQueries(['documents'])
			toast({
				title: 'Document uploaded successfully',
				position: 'top',
				variant: 'solid',
				status: 'success',
				duration: 3000,
			})
			// queryClient.setQueryData(['documents'], (oldData) => [
			// 	...oldData,
			// 	data.chat,
			// ])
		},
		onError: (error) => {
			logtail.info('Error uploading document', error)
			logtail.flush()
			toast({
				title: 'Error uploading document',
				position: 'top',
				variant: 'solid',
				status: 'error',
				duration: 3000,
			})
		},
	})
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
			event.target.value = '' // Reset the file input
			return
		}

		// If the file size is within the limits, invoke the mutation
		uploadDocMutate()
	}
	const {
		data: syncDocData,
		mutate: syncDocMutate,
		isLoading: syncDocIsLoading,
	} = useMutation({
		mutationFn: () => syncDoc(),

		onSuccess: (data) => {
			toast({
				title: 'Data synced successfully',
				position: 'top',
				variant: 'solid',
				status: 'success',
				duration: 3000,
			})
			//queryClient.invalidateQueries(['documents'])
			// queryClient.setQueryData(['documents'], (oldData) => [
			// 	...oldData,
			// 	data.chat,
			// ])
		},
		onError: (error) => {
			logtail.info('Error syncing data', error)
			logtail.flush()
		},
	})

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
				<Flex flexDir={'column'} gap={2} p={6}>
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
					<Input
						type='file'
						ref={uploadRef}
						onChange={(e) => handleFileChange(e)}
						display={'none'}
					/>

					<FunctionalBtn
						title={'upload document'}
						cursor={'pointer'}
						onClick={() => uploadRef.current.click()}
						icon={
							uploadDocIsLoading ? (
								<Spinner />
							) : (
								<CloudUploadIcon fill={text} />
							)
						}
					/>
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
