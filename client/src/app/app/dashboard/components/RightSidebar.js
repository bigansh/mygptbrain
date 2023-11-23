'use client'
import React, { useState } from 'react'
import { BsCheck2, BsLayoutSidebarInsetReverse } from 'react-icons/bs'
import { useColors } from '@/utils/colors'
import {
	Button,
	Flex,
	Heading,
	InputGroup,
	Input,
	Text,
	InputRightElement,
	Spinner,
	Box,
	useToast,
	Popover,
	PopoverTrigger,
	useDisclosure,
	PopoverContent,
	Img,
} from '@chakra-ui/react'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { useThreads } from '@/context'
import { deleteChat, readChat, updateChat } from '@/api'
import { IoMdClose } from 'react-icons/io'
import FunctionalBtn from './FunctionalBtn'
import { ChevIcon, ChevRevIcon, DeleteIcon, EditIcon } from '@/icons'
import { logtail } from '@/app/providers'
import {
	useChatPreferences,
	useDocumentsData,
	useUserData,
} from '@/app/query-hooks'
import { llmButtons } from '@/data'

const RightSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
	const { base800, base700, base600, text, redbg } = useColors()
	const [llmType, setLlmType] = useState('chatGPT')

	const {
		isOpen: isOpenLLM,
		onToggle: onToggleLLM,
		onClose: onCloseLLM,
	} = useDisclosure()

	const toast = useToast()
	const queryClient = useQueryClient()
	const {
		currentThread,
		setCurrentThread,
		currentDocument,
		setCurrentDocument,
		setCurrentView,
	} = useThreads()

	const { data: userData } = useUserData()

	const socialMediaKeys = [
		{
			title: 'Reddit',
			key: 'reddit_id',
		},
		{
			title: 'Pocket',
			key: 'pocket_id',
		},
		{
			title: 'Google',
			key: 'google_id',
		},
		{
			title: 'Notion',
			key: 'notion_id',
		},
	]

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
			console.log(data)
			setEditName(data[0].chat_name)
			setLlmType(data[0].preferences.llm_model || 'ChatGPT')
			setSourceDoc(data[0].preferences.data_sources || ['All'])
			setSendType(data[0].preferences.send_type || 'Stuff')
		},
		onError: (error) => {
			logtail.info('Error getting thread', error)
			logtail.flush()
		},
	})

	const [editName, setEditName] = useState('')
	const [isNameEditing, setNameEditing] = useState(false)

	const { data: documentData } = useDocumentsData({
		enabled: currentDocument !== '' && userData?.profile_id ? true : false,
		funcArgs: {
			profile_id: userData?.profile_id,
			document_id: currentDocument,
		},
	})

	const { isLoading: updateNameIsLoading, mutate: updateNameMutate } =
		useMutation({
			mutationFn: () =>
				updateChat({ chat_id: currentThread, chat_name: editName }),

			onSuccess: (data) => {
				setNameEditing(false)
				setEditName(data.chat_name)
				queryClient.invalidateQueries(['threads'])
				queryClient.setQueryData(['threads', currentThread], () => {
					return [data]
				})
				toast({
					title: 'Name updated successfully',
					position: 'top',
					variant: 'subtle',
					status: 'success',
					duration: 3000,
				})
			},

			onError: (error) => {
				logtail.info('Error editng name', error)
				logtail.flush()
			},
		})

	const { isLoading: deleteThreadIsLoading, mutate: deleteThreadMutate } =
		useMutation({
			mutationFn: () =>
				deleteChat({
					chat_id: currentThread,
					profile_id: userData?.profile_id,
				}),
			onSuccess: (data) => {
				queryClient.invalidateQueries(['threads'])
				toast({
					title: 'Thread deleted',
					position: 'top',
					variant: 'subtle',
					status: 'success',
					duration: 3000,
				})
				setCurrentDocument('')
				setCurrentThread('new')
				setCurrentView('chat')
			},

			onError: (error) => {
				logtail.info('Error deleting thread', error)
				logtail.flush()
				toast({
					title: 'Error deleting thread',
					position: 'top',
					variant: 'subtle',
					status: 'error',
					duration: 3000,
				})
			},
		})
	const {
		isLoading: isLoadingChatPreferences,
		mutate: mutateChatPreferences,
	} = useChatPreferences({
		currentThread,
		onSuccess: (data) => {
			setLlmType(data)
			onToggleLLM()
		},
	})

	return (
		<Flex
			transition={'all 0.5s ease-in'}
			pos={['fixed', 'relative']}
			top={0}
			right={0}
			background={base800}
			minW={['100vw', isSidebarOpen ? '20vw' : '']}
			maxW={['100vw', isSidebarOpen ? '20vw' : '']}
			minH={['100vh', '']}
			display={isSidebarOpen ? 'flex' : 'none'}
			maxH={'100vh'}
			py={6}
			flexDir={'column'}
		>
			<Flex flexDir={'column'} gap={2} w={'100%'} px={6}>
				<Box
					display={['block', 'none']}
					onClick={() => setIsSidebarOpen(false)}
					position={'absolute'}
					top={'20px'}
					right={'20px'}
				>
					<IoMdClose />
				</Box>
				<Heading fontSize={'2xl'} fontWeight={'400'}>
					sources
				</Heading>
				{threadData && (
					<Flex flexDir={'column'} gap={2} mt={2}>
						{threadData[0]?.source_documents
							?.filter((item) =>
								documentData?.some(
									(idItem) => idItem.document_id === item
								)
							)
							.map((item, index) => (
								<Button
									display={'flex'}
									overflow={'hidden'}
									justifyContent={'flex-start'}
									key={item.chat_id}
									background={
										currentDocument === item
											? base700
											: base800
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
											)?.heading
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
							<InputRightElement mr={1}>
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

					<Popover
						placement='bottom-start'
						isOpen={isOpenLLM}
						matchWidth
						returnFocusOnClose={false}
						onClose={onCloseLLM}
					>
						<PopoverTrigger>
							<Button
								onClick={onToggleLLM}
								_hover={{ bg: base600 }}
								bg={base700}
								w={'100%'}
								justifyContent={'space-between'}
								fontWeight={'400'}
								borderTopRadius={isOpenLLM && '0px'}
								isTruncated
							>
								<Text textAlign={'initial'} isTruncated>
									{!isLoadingChatPreferences ? (
										llmType
									) : (
										<Spinner />
									)}
								</Text>
								<Img
									ml={2}
									mr={'auto'}
									src={
										llmButtons.find(
											(e) => e.llmTypeValue == llmType
										)?.iconSrc
									}
								/>

								{isOpenLLM ? (
									<ChevRevIcon fill={text} />
								) : (
									<ChevIcon fill={text} />
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent
							boxShadow={'0px'}
							mb={'-0.5rem'}
							borderBottomRadius={'0px'}
							borderBottom={`1px solid ${text}`}
							background={base700}
							w={'100%'}
							style={{ 'backdrop-filter': 'blur(5px)' }}
						>
							{llmButtons.map(
								({ title, llmTypeValue, iconSrc, isPro }) => (
									<FunctionalBtn
										title={title}
										isPro={isPro}
										enabled={llmType == llmTypeValue}
										cursor={'pointer'}
										onClick={() => {
											mutateChatPreferences(llmTypeValue)
										}}
										icon={<img src={iconSrc} />}
									/>
								)
							)}
						</PopoverContent>
					</Popover>

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
				p={['8px', '10px']}
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
				<BsLayoutSidebarInsetReverse fontSize={[22, 24]} />
			</Button>
		</Flex>
	)
}
export default RightSidebar
