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
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	FormLabel,
	DrawerCloseButton,
	Stack,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'
import { useThreads } from '@/context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getDoc, getUser, readChat, syncDoc, uploadDoc } from '@/api'
import Search from './Search'
import FunctionalBtn from './FunctionalBtn'
import SettingModal from './SettingModal'
import {
	AddIcon,
	CloudUploadIcon,
	RotateIcon,
	ThreadIcon,
	DocumentIcon,
} from '@/icons'
const RightSideBarDrawer = ({ isOpenDrawer, onCloseDrawer, onOpenDrawer }) => {
	const queryClient = useQueryClient()
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
			console.log(data, 'read chat data 3')
		},
	})

	const { data: docData, isLoading: docsIsLoading } = useQuery({
		queryKey: ['documents'],
		queryFn: () => getDoc({ profile_id: userData?.profile_id }),
		enabled: userData?.profile_id ? true : false,
		//placeholderData: [{ document_id: 1, heading: 'title 1' }],
		onError: (error) => {
			console.log(error, 'current doc check')
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
				variant: 'left-accent',
				status: 'success',
				duration: 3000,
			})
			// queryClient.setQueryData(['documents'], (oldData) => [
			// 	...oldData,
			// 	data.chat,
			// ])
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
		data: syncDocData,
		mutate: syncDocMutate,
		isLoading: syncDocIsLoading,
	} = useMutation({
		mutationFn: () => syncDoc(),

		onSuccess: (data) => {
			console.log(data, 'sync doc')
			toast({
				title: 'Data synced successfully',
				position: 'top',
				variant: 'left-accent',
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
			console.log(error)
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
			e.heading.toLowerCase().includes(documentInput.toLowerCase())
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
				<DrawerCloseButton />
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
								console.log('chat clicked')
								setCurrentThread('new')
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
							overflow={'scroll'}
						>
							{filteredThreads?.map((item, index) => (
								<Button
									display={'flex'}
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
								console.log('trigger')
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
							onChange={() => uploadDocMutate()}
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
							overflow={'scroll'}
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
										{item.heading}
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
			</DrawerContent>
		</Drawer>
	)
}

export default RightSideBarDrawer
