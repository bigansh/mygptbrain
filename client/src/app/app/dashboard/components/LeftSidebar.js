'use client'
import React, { useState } from 'react'
import { BsCheck, BsCheck2, BsLayoutSidebarInsetReverse } from 'react-icons/bs'
import { useColors } from '@/utils/colors'
import {
	Button,
	Flex,
	Heading,
	InputGroup,
	Input,
	Text,
	InputLeftElement,
	InputRightElement,
	CheckboxIcon,
	Spinner,
	Box,
	useToast,
} from '@chakra-ui/react'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { useThreads } from '@/context'
import { deleteChat, getDoc, getUser, readChat, updateChat } from '@/api'
import { PiChatsThin } from 'react-icons/pi'
import FunctionalBtn from './FunctionalBtn'
import { HiOutlineFilter, HiOutlinePencil } from 'react-icons/hi'
import { BsChevronDown } from 'react-icons/bs'
import { ChevIcon, DeleteIcon, EditIcon, FilterIcon } from '@/icons'
const LeftSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
	const { base, base800, base700, base600, text, redbg } = useColors()
	const toast = useToast()
	const queryClient = useQueryClient()
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

	const { data: threadData } = useQuery({
		queryKey: ['threads', currentThread],
		queryFn: () =>
			readChat({
				profile_id: userData?.profile_id,
				chat_id: currentThread,
			}),
		enabled:
			currentThread !== '' &&
			currentThread !== 'new' &&
			userData?.profile_id
				? true
				: false,
		onSuccess: (data) => {
			setEditName(data[0].chat_name)
			// console.log(data, 'read chat data 1', currentThread)
		},
		onError: (error) => {
			console.log(data, 'error chat data 1')
		},
	})

	const [editName, setEditName] = useState('')
	const [isNameEditing, setNameEditing] = useState(false)

	const { data: documentData } = useQuery({
		queryKey: ['documents'],
		queryFn: () =>
			getDoc({
				profile_id: userData?.profile_id,
				document_id: currentDocument,
			}),
		enabled: currentDocument !== '' && userData?.profile_id ? true : false,
		onSuccess: (data) => {
			// console.log(data, data[0].body, 'read doc data')
		},
		onError: (error) => {
			console.log(error, 'err doc data')
		},
	})

	const {
		data: updateNameData,
		isLoading: updateNameIsLoading,
		mutate: updateNameMutate,
	} = useMutation({
		mutationFn: () =>
			updateChat({ chat_id: currentThread, chat_name: editName }),

		onSuccess: (data) => {
			setNameEditing(false)
			setEditName(data.chat_name)
			queryClient.invalidateQueries(['threads'])
			console.log(data, 'update chat name data')
			queryClient.setQueryData(['threads', currentThread], (prev) => {
				return [data]
			})
			toast({
				title: 'Name updated successfully',
				position: 'top',
				variant: 'left-accent',
				status: 'success',
				duration: 3000,
			})
		},

		onError: (error) => {
			console.log(error)
		},
	})

	const {
		data: deleteThreadData,
		isLoading: deleteThreadIsLoading,
		mutate: deleteThreadMutate,
	} = useMutation({
		mutationFn: () =>
			deleteChat({
				chat_id: currentThread,
				profile_id: userData?.profile_id,
			}),
		onSuccess: (data) => {
			console.log(data, 'update chat name data')
			queryClient.invalidateQueries(['threads'])
			toast({
				title: 'Thread deleted',
				position: 'top',
				variant: 'left-accent',
				status: 'success',
				duration: 3000,
			})
			setCurrentDocument('')
			setCurrentThread('new')
			setCurrentView('chat')
		},

		onError: (error) => {
			console.log(error)
			toast({
				title: 'Error deleting thread',
				position: 'top',
				variant: 'left-accent',
				status: 'error',
				duration: 3000,
			})
		},
	})

	const editNameFunc = () => {}
	return (
		<Flex
			transition={'all 0.5s ease-in'}
			pos={'relative'}
			background={base800}
			minW={isSidebarOpen ? '20vw' : ''}
			maxW={isSidebarOpen ? '20vw' : ''}
			display={isSidebarOpen ? 'flex' : 'none'}
			maxH={'100vh'}
			py={6}
			flexDir={'column'}
		>
			<Flex flexDir={'column'} gap={2} w={'100%'} px={6}>
				<Heading fontSize={'2xl'} fontWeight={'400'}>
					sources
				</Heading>
				{threadData && (
					<Flex flexDir={'column'} gap={2} mt={2}>
						{threadData[0]?.source_documents?.map((item, index) => (
							<Button
								display={'flex'}
								overflow={'hidden'}
								justifyContent={'flex-start'}
								key={item.chat_id}
								background={
									currentDocument === item ? base700 : base800
								}
								_hover={{ background: base700 }}
								cursor={'pointer'}
								onClick={() => {
									setCurrentDocument(item)
									setCurrentView('document')
								}}
								py={4}
								px='10px'
								gap={2}
								fontWeight={'400'}
							>
								<Text isTruncated>
									{index + 1}.{' '}
									{
										documentData?.find(
											(e) => e.document_id == item
										).heading
									}
								</Text>
							</Button>
						))}
					</Flex>
				)}
			</Flex>
			<Box
				borderTop='2px'
				borderColor='black.900'
				w={'100%'}
				px={2}
				pt={4}
				mt={'auto'}
			></Box>
			<Flex flexDir={'column'} gap={2} w={'100%'} px={6}>
				<Heading fontSize={'2xl'} fontWeight={'400'} pb={2}>
					preferences
				</Heading>
				<Flex flexDir={'column'} gap={2}>
					{isNameEditing ? (
						<InputGroup
							cursor={'pointer'}
							bg={base700}
							w={'100%'}
							overflow={'hidden'}
							rounded={'md'}
							justifyContent={'space-between'}
							fontWeight={'400'}
						>
							<Input
								value={editName}
								onChange={(e) => setEditName(e.target.value)}
								border={0}
								placeholder='Enter name'
							/>
							<InputRightElement
								mr={1}
								onClick={() => editNameFunc()}
							>
								{updateNameIsLoading ? (
									<Spinner />
								) : (
									<BsCheck2
										onClick={() => updateNameMutate()}
										fontSize={20}
										fill='#187f1e'
										stroke='#187f1e'
										strokeWidth='0.5'
									/>
								)}
							</InputRightElement>
						</InputGroup>
					) : (
						<FunctionalBtn
							title={editName}
							icon={<EditIcon fill={text} />}
							onClick={() => setNameEditing(true)}
						/>
					)}
					<FunctionalBtn
						title='llm model'
						disabled={true}
						icon={<ChevIcon fill={text} />}
					/>
					<FunctionalBtn
						title='send type'
						disabled={true}
						icon={<ChevIcon fill={text} />}
					/>
					<FunctionalBtn
						title='filter documents'
						disabled={true}
						icon={<FilterIcon fill={text} />}
					/>
					<Button
						cursor={'pointer'}
						onClick={() => {
							deleteThreadMutate()
						}}
						bg={redbg}
						_hover={{ opacity: '80%' }}
						ho
						w={'100%'}
						justifyContent={'space-between'}
						fontWeight={'400'}
					>
						delete thread
						{deleteThreadIsLoading ? (
							<Spinner />
						) : (
							<DeleteIcon fill={'rgba(255, 0, 0, 1)'} />
						)}
					</Button>
				</Flex>
			</Flex>
			<Button
				p={'10px'}
				cursor={'pointer'}
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				position={'absolute'}
				right={'100%'}
				bottom={0}
				borderLeftRadius={4}
				borderRightRadius={0}
				background={base700}
				// display={isSidebarOpen ? "none" : "flex"}
			>
				{' '}
				<BsLayoutSidebarInsetReverse fontSize={24} />
			</Button>
		</Flex>
	)
}
export default LeftSidebar
