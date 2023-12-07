import React, { useEffect, useRef, useState } from 'react'
import {
	Box,
	Flex,
	Heading,
	Spinner,
	Text,
	Tooltip,
	Textarea,
	CircularProgress,
	useToast,
	CloseButton,
	useDisclosure,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
	PopoverHeader,
	PopoverCloseButton,
	PopoverBody,
	Button,
	PopoverFooter,
	Img,
} from '@chakra-ui/react'
import {
	ChatLogoIcon,
	ChatUserIcon,
	ChevIcon,
	ChevRevIcon,
	DeleteIcon,
	LinkIcon,
	PreferencesSetting,
	Setting,
	ThreadIcon,
} from '@/icons'
import { useColors } from '@/utils/colors'
import { logtail } from '@/app/providers'
import { useRouter } from 'next/navigation'
import { PiPaperPlaneTiltLight } from 'react-icons/pi'
import ResizeTextarea from 'react-textarea-autosize'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	deleteDoc,
	getDoc,
	readChat,
	createChat,
	updateChat,
	createDocumentChat,
	deleteChat,
} from '@/api'

import {
	useChatPreferences,
	useChatPromptTemplate,
	useDocumentsData,
	useUserData,
} from '@/app/query-hooks'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useThreads } from '@/context'
import { IoClose, IoCloseOutline } from 'react-icons/io5'
import { llmButtons } from '@/data'
import FunctionalBtn from './FunctionalBtn'
import { FiCheck } from 'react-icons/fi'

const DocumentWrapper = ({ isSidebarOpen }) => {
	const [inputValue, setInputValue] = useState('')
	const toast = useToast()
	const [docChat, setdocChat] = useState(null)
	const [isChatOpen, setChatOpen] = useState(null)

	const divRef = useRef()
	const { base, text, base700, base800 } = useColors()
	const {
		setCurrentThread,
		currentDocument,
		setCurrentDocument,
		setCurrentView,
	} = useThreads()
	const queryClient = useQueryClient()

	const { data: userData } = useUserData()
	const [llmType, setLlmType] = useState('chatGPT')
	const [promptTemp, setPromptTemp] = useState()

	const { data: threadsData, isLoading: threadsIsLoading } = useQuery({
		queryKey: ['doc-threads', currentDocument],
		queryFn: () =>
			readChat({
				profile_id: userData?.profile_id,
				preferences: {
					document_id: currentDocument,
				},
			}),
		enabled:
			userData?.profile_id && currentDocument !== '' && isChatOpen == true
				? true
				: false,
		onSuccess: (data) => {
			console.log(data)
			setdocChat(data.length > 0 ? data[0].chat_id : 'new')
			if (data.length > 0) {
				setLlmType(data[0].preferences.llm_model || 'ChatGPT')
				setPromptTemp(data[0].preferences.prompt_template || '0')
			}
		},
		onError: (error) => {
			logtail.info('Error getting threads', error)
			logtail.flush()
		},
	})

	useEffect(() => {
		setChatOpen(false)
	}, [currentDocument])
	// useEffect(() => {
	// 	divRef?.current?.scrollIntoView({ behavior: 'smooth' })
	// }, [threadsData[0]])

	const placeholderData = {
		chat_array: [
			{
				llm: `hey there! i'm here to make your life easier. i can provide you with summaries, bullet points, definitions, whatever, based on the data you give me. think of me as your personal chatgpt assistant, ready to answer all your questions within your context. ask me anything you want!

to make sure i give you accurate results, please keep in mind that my knowledge is limited to what you provide. unfortunately, i can't access the internet, but you can enhance my capabilities by connecting additional platforms using this link. you can also fine-tune my performance by filtering the documents i should refer to in the settings menu on the right.

feel free to customize your experience by changing the thread's name, the model i use to answer, and a few other settings. let's get started and make the most out of our conversation!`,
				user: 'hey mygptbrain, what all can you do?',
			},
		],
	}

	const { data: documentData } = useQuery({
		queryKey: ['documents', currentDocument],
		queryFn: () =>
			getDoc({
				profile_id: userData?.profile_id,
				document_id: currentDocument,
			}),
		enabled: currentDocument !== '' && userData?.profile_id ? true : false,
		onError: (error) => {
			logtail.info('Error getting document', error)
			logtail.flush()
		},
	})

	const { isLoading: deleteDocIsLoading, mutate: deleteDocMutate } =
		useMutation({
			mutationFn: () =>
				deleteDoc({
					profile_id: userData?.profile_id,
					document_id: currentDocument,
				}),
			onSuccess: () => {
				queryClient.invalidateQueries(['documents'])
				toast({
					title: 'document deleted',
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
				logtail.info('Error deleting document', error)
				logtail.flush()
				toast({
					title: 'error deleting the document',
					position: 'top',
					variant: 'subtle',
					status: 'error',
					duration: 3000,
				})
			},
		})

	const router = useRouter()

	return documentData ? (
		<Flex
			background={base}
			h={['95vh', '100vh']}
			overflowY='auto'
			overflowX='hidden'
			w={['100vw', '80vw']}
			maxW={['100vw', '80vw']}
			margin={'auto'}
			mt={['50px', 'auto']}
			className='documentview'
			flexDir={['column', 'row']}
		>
			<Flex
				p={[6, isChatOpen ? 6 : 6]}
				py={6}
				flexDir={'column'}
				//w={['100%', '65vw']}
				minW={[isChatOpen ? '0%' : '100%', isChatOpen ? '50%' : '65vw']}
				maxW={[isChatOpen ? '0%' : '100%', isChatOpen ? '50%' : '65vw']}
				//maxW={['100%', '65vw']}
				h={[isChatOpen ? '0vh' : '100vh', '100vh']}
				display={[isChatOpen ? 'none' : 'flex', 'flex']}
				mx={'auto'}
				className='documentview'
				overflowY={isChatOpen ? 'auto' : 'unset'}
			>
				{' '}
				<Flex
					alignItems={'center'}
					justifyContent={'space-between'}
					mb={4}
				>
					<Heading
						isTruncated
						fontSize={'2xl'}
						fontWeight={600}
						w={'80%'}
					>
						{documentData[0]?.heading}
					</Heading>
					<Flex gap={3} alignItems={'center'}>
						<Tooltip
							label='Chat with this document'
							aria-label='A tooltip'
						>
							<Flex
								cursor={'pointer'}
								onClick={() => {
									setChatOpen(!isChatOpen)
								}}
								className='docthread'
							>
								<ThreadIcon
									fill={!isChatOpen ? text : 'green'}
								/>
							</Flex>
						</Tooltip>

						{documentData[0].documentMetadata.url && (
							<Tooltip
								label='Link to document'
								aria-label='A tooltip'
							>
								<Flex
									cursor={'pointer'}
									onClick={() =>
										router.push(
											documentData[0]?.documentMetadata
												?.url
										)
									}
									className='doclink'
								>
									<LinkIcon fill={text} />
								</Flex>
							</Tooltip>
						)}
						<Tooltip label='Delete document' aria-label='A tooltip'>
							<Flex
								cursor={'pointer'}
								onClick={deleteDocMutate}
								className='docdelete'
							>
								{deleteDocIsLoading ? (
									<Spinner />
								) : (
									<DeleteIcon fill='rgba(255, 0, 0, 1)' />
								)}
							</Flex>
						</Tooltip>
					</Flex>
				</Flex>
				<Markdown
					className='break-spaces pb-4'
					//disallowedElements={['img']}
					remarkPlugins={[remarkGfm]}
				>
					{documentData[0]?.body}
				</Markdown>
			</Flex>

			{isChatOpen && (
				<Flex
					flexDir={'column'}
					h={'100vh'}
					borderLeft={['', `1px solid ${text}`]}
					minW={['100%', '50%']}
					maxW={['100%', '50%']}
					//maxW={['100vw', isSidebarOpen ? '60vw' : '80vw']}
					transition={'all 0.5s ease-in'}
					background={base}
					overflowY={'auto'}
					top={[0, 'unset']}
					pos={['absolute', 'relative']}
					pt={['50px', 0]}
				>
					{threadsIsLoading ? (
						<Flex
							className='wrapper'
							id='wrapper'
							h={'100vh'}
							justifyContent={'center'}
							alignItems={'center'}
						>
							<Spinner />
						</Flex>
					) : (
						<Flex
							flexDir={'column'}
							overflowY='auto'
							overflowX='hidden'
							w={'100%'}
							borderTop={['1px solid #2c2c2c', '0px']}
						>
							{threadsData[0] == undefined ||
							threadsData[0].length == 0
								? placeholderData?.chat_array?.map(
										(message, index) => (
											<SingleChatComponent
												message={message}
											/>
										)
								  )
								: threadsData[0] &&
								  threadsData[0]?.chat_array?.map(
										(message, index) => (
											<SingleChatComponent
												message={message}
											/>
										)
								  )}

							<Flex ref={divRef}></Flex>
						</Flex>
					)}
					<ChatInput
						inputValue={inputValue}
						setInputValue={setInputValue}
						divRef={divRef}
						docChat={docChat}
						setdocChat={setdocChat}
						llmType={llmType}
						setLlmType={setLlmType}
						promptTemp={promptTemp}
						setPromptTemp={setPromptTemp}
						setChatOpen={setChatOpen}
					/>
					<Flex
						display={['block', 'none']}
						cursor={'pointer'}
						pos={'absolute'}
						top={4}
						right={5}
						onClick={() => {
							setChatOpen(!isChatOpen)
						}}
					>
						<IoClose />
					</Flex>
				</Flex>
			)}
		</Flex>
	) : (
		<Flex
			flexDir={'column'}
			transition={'all 0.5s ease-in'}
			background={base}
			h={'100vh'}
			gap={4}
			p={6}
			w={isSidebarOpen ? '60vw' : '80vw'}
			maxW={isSidebarOpen ? '60vw' : '80vw'}
			margin={'auto'}
		>
			<Spinner margin={'auto'} />
		</Flex>
	)
}

export default DocumentWrapper

const SingleChatComponent = ({ message }) => {
	const { base700, base600, text } = useColors()
	return (
		<>
			<Flex flexDir={'column'}>
				<Flex justifyContent={'start'} gap={2} bg={base700} p={5}>
					<Flex
						gap={2}
						//w={['100%', '65vw']}
						minW={'100%'}
						maxW={'100%'}
						margin={'auto'}
					>
						<Box w={['40px', 'auto']}>
							<ChatUserIcon fill={text} size={30} />
						</Box>
						<Text marginBlock={'auto'} fontSize={'md'}>
							{message.user}
						</Text>
					</Flex>
				</Flex>
				<Flex justifyContent={'start'} gap={2} p={5}>
					<Flex
						gap={2}
						//w={['100%', '65vw']}
						minW={'100%'}
						maxW={'100%'}
						margin={'auto'}
					>
						<Box>
							<ChatLogoIcon fill={text} size={30} />
						</Box>

						{/* <Text
							whiteSpace={'break-spaces'}
							marginBlock={'auto'}
							fontSize={['sm', 'md']}
						>
							{message.llm}
						</Text> */}

						<Markdown
							className='break-spaces'
							//disallowedElements={['img']}
							remarkPlugins={[remarkGfm]}
						>
							{message.llm}
						</Markdown>
					</Flex>
				</Flex>
			</Flex>
		</>
	)
}

const ChatInput = ({
	inputValue,
	setInputValue,
	divRef,
	docChat,
	setdocChat,
	llmType,
	setLlmType,
	promptTemp,
	setPromptTemp,
	setChatOpen,
}) => {
	const queryClient = useQueryClient()
	const ref = useRef()
	const { currentDocument } = useThreads()
	const { base, base600, base700, text, redbg } = useColors()
	const toast = useToast()
	const { userData } = useUserData()
	const { data: docData, isLoading: docsIsLoading } = useDocumentsData({
		enabled: !!userData?.profile_id,
		funcArgs: { profile_id: userData?.profile_id },
	})

	const { isOpen, onToggle, onClose } = useDisclosure()

	const {
		isOpen: isOpenLLM,
		onToggle: onToggleLLM,
		onClose: onCloseLLM,
	} = useDisclosure()

	const {
		isOpen: isOpenTemplate,
		onToggle: onToggleTemplate,
		onClose: onCloseTemplate,
	} = useDisclosure()

	const {
		data,
		isLoading: addIsLoading,
		mutate: addMutate,
	} = useMutation({
		mutationFn: () =>
			createDocumentChat({
				prompt: inputValue,
				chat_id: docChat,
				preferences: {
					document_id: currentDocument,
				},
			}),

		onSuccess: (data) => {
			setdocChat(data.chat_id)
			setLlmType(data.preferences.llm_model || 'ChatGPT')
			setPromptTemp(data.preferences.prompt_template || '0')
			queryClient.setQueryData(
				['doc-threads', currentDocument],
				(prev) => {
					return [data]
				}
			)
		},
		onError: (error) => {
			toast({
				title: 'error chatting with the document',
				position: 'top',
				variant: 'subtle',
				status: 'error',
				duration: 3000,
			})

			logtail.info('Error creating document chat', error)
			logtail.flush()
		},
	})

	const {
		data: updateData,
		mutate: updateMutate,
		isLoading: updateIsLoading,
	} = useMutation({
		mutationFn: () =>
			updateChat({
				prompt: inputValue,
				chat_id: docChat,
				preferences: {
					document_id: currentDocument,
				},
			}),

		onMutate: () => {
			queryClient.setQueryData(
				['doc-threads', currentDocument],
				(prev) => {
					return [
						{
							...prev[0],
							chat_array: [
								...prev[0].chat_array,
								{ user: inputValue, llm: 'loading...' },
							],
						},
					]
				}
			)
			divRef?.current?.scrollIntoView({ behavior: 'smooth' })
		},
		onSuccess: (data) => {
			setInputValue('')
			queryClient.setQueryData(
				['doc-threads', currentDocument],
				(prev) => {
					return [data]
				}
			)
			divRef?.current?.scrollIntoView({ behavior: 'smooth' })
		},

		onError: (error) => {
			logtail.info('Error getting document thread', error)
			logtail.flush()
		},
	})

	const { isLoading: deleteThreadIsLoading, mutate: deleteThreadMutate } =
		useMutation({
			mutationFn: () =>
				deleteChat({
					chat_id: docChat,
					profile_id: userData?.profile_id,
				}),
			onSuccess: (data) => {
				queryClient.invalidateQueries(['doc-threads', currentDocument])
				toast({
					title: 'thread deleted',
					position: 'top',
					variant: 'subtle',
					status: 'success',
					duration: 3000,
				})
				setChatOpen(null)
				setdocChat('new')
			},

			onError: (error) => {
				logtail.info('Error deleting thread', error)
				logtail.flush()
				toast({
					title: 'error deleting thread',
					position: 'top',
					variant: 'subtle',
					status: 'error',
					duration: 3000,
				})
			},
		})
	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
			docChat == 'new' ? addMutate() : updateMutate()
		}
	}

	useEffect(() => {
		if (updateIsLoading || addIsLoading) {
			setInputValue('')
		}
	}, [updateIsLoading, addIsLoading])

	const {
		isLoading: isLoadingChatPreferences,
		mutate: mutateChatPreferences,
	} = useChatPreferences({
		currentThread: docChat,
		onSuccess: (data) => {
			setLlmType(data)
			onToggleLLM()
		},
	})

	const { isLoading: isLoadingPT, mutate: mutatePT } = useChatPromptTemplate({
		currentThread: docChat,
		onSuccess: (data) => {
			setPromptTemp(Number(data))
			onToggleLLM()
		},
	})

	return (
		<Flex w={'100%'} mt='auto' p={2}>
			<Flex
				px={4}
				py={2}
				pos={'sticky'}
				bottom={0}
				mt={'auto'}
				my={4}
				mx={4}
				mb={1}
				mr={2}
				w={'100%'}
				alignItems={'center'}
				bg={base700}
				rounded={'md'}
			>
				<Textarea
					placeholder={['ask your second brain, a question!']}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					border={'transparent'}
					bg={'transparent'}
					p={0}
					_hover={{
						border: 'transparent',
						shadow: 'none',
					}}
					_focus={{
						border: 'transparent',
						shadow: 'none',
					}}
					_autofill={{
						border: 'transparent',
						shadow: 'none',
					}}
					onKeyDown={handleKeyDown}
					minH='unset'
					w='100%'
					overflowY='auto'
					overflowX='hidden'
					resize='none'
					ref={ref}
					minRows={1}
					maxRows={10}
					mx={2}
					as={ResizeTextarea}
					transition='height none'
					fontSize={['sm', 'md']}
				/>
				<Box
					cursor={'pointer'}
					onClick={() => {
						docChat == 'new' ? addMutate() : updateMutate()
					}}
				>
					{updateIsLoading || addIsLoading ? (
						<CircularProgress
							size={'20px'}
							thickness={4}
							trackColor={'transparent'}
							color={text}
							isIndeterminate
						/>
					) : (
						<PiPaperPlaneTiltLight size={20} />
					)}
				</Box>
			</Flex>
			{docChat !== 'new' && (
				<Popover
					returnFocusOnClose={false}
					isOpen={isOpen}
					onClose={onClose}
					placement='top-end'
					closeOnBlur={false}
					p={0}
				>
					<PopoverTrigger>
						<Button
							onClick={onToggle}
							_hover={{ bg: base600 }}
							bg={base700}
							px={2}
							my={4}
							mb={1}
						>
							<PreferencesSetting fill={text} />
						</Button>
					</PopoverTrigger>

					<PopoverContent
						p={0}
						background={base700}
						style={{ 'backdrop-filter': 'blur(5px)' }}
					>
						<PopoverBody
							p={2}
							// pb={2}
							gap={2}
							display={'flex'}
							flexDir={'column'}
							w={'100%'}
						>
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
										_hover={{ bg: base700 }}
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
													(e) =>
														e.llmTypeValue ==
														llmType
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
									background={base600}
									w={'100%'}
									style={{ 'backdrop-filter': 'blur(20px)' }}
								>
									{llmButtons.map(
										({
											title,
											llmTypeValue,
											iconSrc,
											isPro,
										}) => (
											<FunctionalBtn
												title={title}
												isPro={isPro}
												enabled={
													llmType == llmTypeValue
												}
												cursor={'pointer'}
												onClick={() => {
													if (
														!userData?.userMetadata
															?.subscription_status
													) {
														onPaymentModalOpen()
														showToast(
															'LLM_TYPE_CHANGE'
														)
													} else {
														mutateChatPreferences(
															llmTypeValue
														)
													}
												}}
												bg={true}
												icon={<img src={iconSrc} />}
											/>
										)
									)}
								</PopoverContent>
							</Popover>
							<Popover
								placement='bottom-start'
								isOpen={isOpenTemplate}
								matchWidth
								returnFocusOnClose={false}
								onClose={onCloseTemplate}
							>
								<PopoverTrigger>
									<Button
										onClick={onToggleTemplate}
										_hover={{ bg: base700 }}
										bg={base700}
										w={'100%'}
										justifyContent={'space-between'}
										fontWeight={'400'}
										borderTopRadius={
											isOpenTemplate && '0px'
										}
										isTruncated
									>
										<Text textAlign={'initial'} isTruncated>
											{!isLoadingPT ? (
												`template ${
													Number(promptTemp) + 1
												}`
											) : (
												<Spinner />
											)}
										</Text>

										{isOpenTemplate ? (
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
									overflow={'hidden'}
									background={base600}
									w={'100%'}
									style={{ 'backdrop-filter': 'blur(20px)' }}
								>
									{[1, 2, 3].map((n, index) => (
										<FunctionalBtn
											title={`template ${n}`}
											cursor={'pointer'}
											enabled={index == promptTemp}
											onClick={() => {
												if (
													!userData?.userMetadata
														?.subscription_status
												) {
													onPaymentModalOpen()
													showToast('TEMPLATE_CHANGE')
												} else {
													mutatePT(String(index))
												}
											}}
											bg={true}
											icon={
												index == promptTemp && (
													<FiCheck />
												)
											}
										/>
									))}
								</PopoverContent>
							</Popover>
							<Button
								cursor={'pointer'}
								onClick={() => {
									deleteThreadMutate()
								}}
								bg={redbg}
								color={'#000000'}
								_hover={{ opacity: '80%' }}
								w={'100%'}
								justifyContent={'space-between'}
								fontWeight={'400'}
								// mx={2}
							>
								delete thread
								{deleteThreadIsLoading ? (
									<Spinner />
								) : (
									<DeleteIcon fill={'rgba(255, 0, 0, 1)'} />
								)}
							</Button>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			)}
		</Flex>
	)
}
