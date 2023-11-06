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
} from '@chakra-ui/react'
import {
	ChatLogoIcon,
	ChatUserIcon,
	DeleteIcon,
	LinkIcon,
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
} from '@/api'

import { useDocumentsData, useUserData } from '@/app/query-hooks'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useThreads } from '@/context'
import { useTour } from '@reactour/tour'

const DocumentWrapper = ({ isSidebarOpen }) => {
	const {
		isOpen: isOpenTour,
		currentStep,
		steps,
		setIsOpen,
		setCurrentStep,
	} = useTour()
	const [inputValue, setInputValue] = useState('')
	const toast = useToast()
	const [docChat, setdocChat] = useState(null)
	const [isChatOpen, setChatOpen] = useState(null)

	const divRef = useRef()
	const { base, text, base700 } = useColors()
	const {
		setCurrentThread,
		currentDocument,
		setCurrentDocument,
		setCurrentView,
	} = useThreads()
	const queryClient = useQueryClient()

	const { data: userData } = useUserData()
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
			setdocChat(data.length > 0 ? data[0].chat_id : 'new')
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
					title: 'Document deleted',
					position: 'top',
					variant: 'solid',
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
					title: 'Error deleting document',
					position: 'top',
					variant: 'solid',
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
			w={['100vw', isSidebarOpen ? '60vw' : '80vw']}
			maxW={['100vw', isSidebarOpen ? '60vw' : '80vw']}
			margin={'auto'}
			mt={['50px', 'auto']}
			className='documentview'
			flexDir={['column', 'row']}
		>
			<Flex
				p={6}
				flexDir={'column'}
				//w={['100%', '65vw']}
				minW={[isChatOpen ? '0%' : '100%', isChatOpen ? '50%' : '80%']}
				maxW={[isChatOpen ? '0%' : '100%', isChatOpen ? '50%' : '80%']}
				//maxW={['100%', '65vw']}
				h={[isChatOpen ? '0vh' : '100vh', '100vh']}
				display={[isChatOpen ? 'none' : 'flex', 'flex']}
				mx={'auto'}
				className='documentview'
				overflowY={'auto'}
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
					className='break-spaces'
					//disallowedElements={['img']}
					remarkPlugins={[remarkGfm]}
				>
					{documentData[0]?.body}
				</Markdown>
			</Flex>

			{isChatOpen && (
				<Flex
					p={4}
					flexDir={'column'}
					h={'100vh'}
					borderLeft={['', `1px solid ${text}`]}
					minW={['100%', '50%']}
					maxW={['100%', '50%']}
					//maxW={['100vw', isSidebarOpen ? '60vw' : '80vw']}
					transition={'all 0.5s ease-in'}
					background={base}
					overflowY={'auto'}
					pos={'relative'}
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
					<Flex
						position={'absolute'}
						top={6}
						right={6}
						onClick={() => setChatOpen(!isChatOpen)}
					>
						<CloseButton />
					</Flex>
					<ChatInput
						inputValue={inputValue}
						setInputValue={setInputValue}
						divRef={divRef}
						docChat={docChat}
					/>
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
	const { base700, text } = useColors()
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
						<Text marginBlock={'auto'} fontSize={['sm', 'md']}>
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

const ChatInput = ({ inputValue, setInputValue, divRef, docChat }) => {
	const queryClient = useQueryClient()
	const ref = useRef()
	const { currentDocument } = useThreads()
	const { base, base800, base700, text } = useColors()
	const toast = useToast()
	const { userData } = useUserData()
	const { data: docData, isLoading: docsIsLoading } = useDocumentsData({
		enabled: !!userData?.profile_id,
		funcArgs: { profile_id: userData?.profile_id },
	})

	const {
		data,
		isLoading: addIsLoading,
		mutate: addMutate,
	} = useMutation({
		mutationFn: () =>
			createDocumentChat({
				prompt: inputValue,
				preferences: {
					document_id: currentDocument,
				},
			}),

		onSuccess: (data) => {
			queryClient.setQueryData(
				['doc-threads', currentDocument],
				(prev) => {
					return [data]
				}
			)
			toast({
				title: 'New chat created',
				position: 'top',
				variant: 'solid',
				status: 'success',
				duration: 3000,
			})
		},
		onError: (error) => {
			toast({
				title: 'Error creating document chat',
				position: 'top',
				variant: 'solid',
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
	return (
		<Flex w={'100%'} mt='auto' p={2}>
			<Flex
				px={4}
				py={2}
				pos={'sticky'}
				bottom={0}
				mt={'auto'}
				my={1}
				mx={'auto'}
				minW={'100%'}
				maxW={'100%'}
				alignItems={'center'}
				bg={base700}
				rounded={'md'}
			>
				<Textarea
					placeholder={['ask your second brain, a question!']}
					value={inputValue}
					on
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
							size={30}
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
		</Flex>
	)
}
