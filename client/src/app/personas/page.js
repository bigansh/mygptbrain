'use client'

import {
	Button,
	Flex,
	Heading,
	Box,
	Text,
	useDisclosure,
	useColorMode,
	Textarea,
	CircularProgress,
	Img,
	Drawer,
	DrawerBody,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { BsLayoutSidebarInsetReverse } from 'react-icons/bs'
import { useColors } from '@/utils/colors'
import { AiOutlineMenu, AiOutlinePlus } from 'react-icons/ai'
import { PiPaperPlaneTiltLight } from 'react-icons/pi'
import ResizeTextarea from 'react-textarea-autosize'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ChatUserIcon, DeleteIcon } from '@/icons'
import { Search } from '../app/components'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { usePersonas } from '../query-hooks'
import { personalDirectory } from '@/data'
import { useToastManager } from '@/utils/customToasts'
import { useRouter } from 'next/navigation'

const Personas = () => {
	const { base, base700, text } = useColors()
	const [inputValue, setInputValue] = useState('')
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const [currentThread, setCurrentThread] = useState(1)
	const [currentChats, setCurrentChats] = useState({
		chat_history: '',
		chat_array: [],
	})
	const divRef = useRef()
	const {
		isOpen: isOpenDrawer,
		onOpen: onOpenDrawer,
		onClose: onCloseDrawer,
	} = useDisclosure()

	useEffect(() => {
		const chats = localStorage.getItem(currentThread)
		if (chats) {
			setCurrentChats(JSON.parse(chats))
		} else {
			setCurrentChats({
				chat_history: '',
				chat_array: [
					personalDirectory.find((e) => e.key == currentThread)
						.placeholder,
				],
			})
		}
	}, [currentThread])

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

				<Text maxW={'60%'} isTruncated fontSize={'md'}>
					{
						personalDirectory?.find((e) => e.key == currentThread)
							?.name
					}
				</Text>

				<AiOutlinePlus
					onClick={() => {
						setCurrentThread('new')
					}}
				/>
			</Box>

			<LeftSidebar
				currentThread={currentThread}
				setCurrentThread={setCurrentThread}
			/>

			<Flex
				flexDir={'column'}
				w={['100vw', isSidebarOpen ? '60vw' : '80vw']}
				mt={['50px', 'auto']}
				h={['auto', '100vh']}
				maxW={['100vw', isSidebarOpen ? '60vw' : '80vw']}
				transition={'all 0.5s ease-in'}
				background={base}
			>
				<ChatMessagesContainer
					inputValue={inputValue}
					setInputValue={setInputValue}
					chats={currentChats.chat_array}
					divRef={divRef}
					logo={
						personalDirectory?.find((e) => e.key == currentThread)
							?.image
					}
				/>

				<ChatInput
					inputValue={inputValue}
					setInputValue={setInputValue}
					divRef={divRef}
					currentChats={currentChats}
					setCurrentChats={setCurrentChats}
					currentThread={currentThread}
				/>
			</Flex>
			<RightSidebar
				currentThread={currentThread}
				currentChats={currentChats}
				setCurrentChats={setCurrentChats}
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
				setInputValue={setInputValue}
			/>
			{currentThread !== 'new' && (
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

			<LeftSideBarDrawer
				isOpenDrawer={isOpenDrawer}
				onCloseDrawer={onCloseDrawer}
				onOpenDrawer={onOpenDrawer}
				currentThread={currentThread}
				setCurrentThread={setCurrentThread}
			/>
		</Flex>
	)
}

export default Personas

const ChatMessagesContainer = ({ divRef, logo, chats }) => {
	return (
		<Flex flexDir={'column'} overflowY='auto' overflowX='hidden' w={'100%'}>
			{chats?.map((message) => (
				<SingleChatComponent message={message} logo={logo} />
			))}
			<Flex ref={divRef}></Flex>
		</Flex>
	)
}

const ChatInput = ({
	inputValue,
	setInputValue,
	divRef,
	setCurrentChats,
	currentChats,
	currentThread,
}) => {
	const ref = useRef()
	const { base700, text } = useColors()
	const showToast = useToastManager()

	const { isLoading: isLoadingPersonas, mutate: mutatePersonas } =
		usePersonas({
			onSuccess: (data) => {
				console.log(data)
				const updates = {
					...currentChats,
					chat_history: data.chat_history,
					chat_array: data.chat_array,
					source_documents: data.source_documents,
				}
				setCurrentChats(updates)
				localStorage.setItem(currentThread, JSON.stringify(updates))
				setInputValue('')
				divRef?.current.scrollIntoView({ behavior: 'smooth' })
				divRef.current.scrollIntoView({ behavior: 'smooth' })
			},
		})

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
			if (
				inputValue.length === 0 // Checks for empty or spaces-only strings
			) {
				showToast('PAID_IMAGE_UPLOAD')
				return
			}
			mutatePersonas({
				author: personalDirectory.find((e) => e.key == currentThread)
					.name,
				prompt: inputValue,
				chat_history: currentChats.chat_history,
				chat_array: currentChats.chat_array,
			})
			setCurrentChats({
				...currentChats,
				chat_array: [
					...currentChats.chat_array,
					{ user: inputValue, llm: 'loading...' },
				],
			})
		}
	}

	if (isLoadingPersonas) {
		setInputValue('')
		divRef?.current.scrollIntoView({ behavior: 'smooth' })
		divRef.current.scrollIntoView({ behavior: 'smooth' })
	}
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
				minW={['100%', '58vw']}
				maxW={['100%', '58vw']}
				alignItems={'center'}
				bg={base700}
				rounded={'md'}
			>
				<Textarea
					placeholder={['what would you like to know?']}
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
						mutatePersonas({
							author: personalDirectory.find(
								(e) => e.key == currentThread
							).name,
							prompt: inputValue,
							chat_history: currentChats.chat_history,
							chat_array: currentChats.chat_array,
						})
					}}
				>
					{isLoadingPersonas ? (
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
		</Flex>
	)
}

const SingleChatComponent = ({ message, logo }) => {
	const { base700, text } = useColors()
	return (
		<>
			<Flex flexDir={'column'}>
				<Flex justifyContent={'start'} gap={2} bg={base700} p={5}>
					<Flex
						gap={2}
						w={['100%', '65vw']}
						minW={['100%', '55vw']}
						maxW={['100%', '65vw']}
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
						w={['100%', '65vw']}
						minW={['100%', '55vw']}
						maxW={['100%', '65vw']}
						margin={'auto'}
					>
						<Box w={'40px'} minW={'40px'}>
							<img
								height={'30px'}
								width={'30px'}
								src={logo}
								style={{ borderRadius: '50%' }}
							/>
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

const RightSidebar = ({
	currentThread,
	currentChats,
	setCurrentChats,
	isSidebarOpen,
	setIsSidebarOpen,
	setInputValue,
}) => {
	const { base800, base700, redbg } = useColors()

	const deleteThread = (id) => {
		localStorage.removeItem(id)
		setCurrentChats({
			chat_history: '',
			chat_array: [
				personalDirectory.find((e) => e.key == currentThread)
					.placeholder,
			],
		})
		setInputValue('')
	}

	const generateSources = (sd) => {
		switch (currentThread) {
			case 1:
				return { title: sd.title, url: sd.url }
			case 2:
				return {
					title: sd.title,
					url: `https://genius.com/Taylor-swift-${sd.title.replace(
						/ /g,
						'-'
					)}-lyrics`,
				}
			case 3:
				return { title: '', url: '' }
			case 4:
				return {
					title: sd.title,
					url: `https://youtube.com/watch?v=${sd.id}`,
				}

			default:
				return { title: '', url: '' }
		}
	}
	const router = useRouter()
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
				{currentChats.source_documents && (
					<Flex flexDir={'column'} gap={2} mt={2}>
						{currentChats?.source_documents.map((item, index) => {
							const link = generateSources(item)
							return (
								<Button
									display={'flex'}
									overflow={'hidden'}
									justifyContent={'flex-start'}
									key={index}
									cursor={'pointer'}
									onClick={() => {
										router.push(link?.url)
									}}
									background={base800}
									_hover={{ background: base700 }}
									py={4}
									px='10px'
									gap={2}
									fontWeight={'400'}
								>
									<Text isTruncated>
										{index + 1}. {link?.title}{' '}
									</Text>
								</Button>
							)
						})}
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
					<Button
						cursor={'pointer'}
						onClick={() => deleteThread(currentThread)}
						bg={redbg}
						color={'#000'}
						_hover={{ opacity: '80%' }}
						w={'100%'}
						justifyContent={'space-between'}
						fontWeight={'400'}
					>
						reset thread
						<DeleteIcon fill={'rgba(255, 0, 0, 1)'} />
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
				<BsLayoutSidebarInsetReverse fontSize={[22, 24]} />
			</Button>
		</Flex>
	)
}

const LeftSidebar = ({ currentThread, setCurrentThread }) => {
	const { base800, base700 } = useColors()
	const { colorMode, toggleColorMode } = useColorMode()

	const [searchTerm, setSearchTerm] = useState('')

	const filteredPersonas = personalDirectory?.filter((e) =>
		e.name.toLowerCase().includes(searchTerm.toLowerCase())
	)
	return (
		<Flex
			flexDir={'column'}
			background={base800}
			minW={'20vw'}
			maxW={'20vw'}
			maxH={'100vh'}
			className='documents'
			display={['none', 'flex']}
		>
			<Flex flexDir={'column'} gap={2} p={6}>
				<Heading fontSize={'2xl'} fontWeight={'400'}>
					personas
				</Heading>
				<Box borderTop='2px' borderColor='black.900' w={'100%'}></Box>

				<Search
					title='search personas'
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>

				<Box borderTop='2px' borderColor='black.900' w={'100%'}></Box>
			</Flex>

			<Flex
				flexDir={'column'}
				gap={2}
				px={6}
				//maxH={'400px'}
				overflowY='auto'
				overflowX='hidden'
			>
				{filteredPersonas?.map((item, index) => (
					<Button
						index={index}
						display={'grid'}
						justifyContent={'flex-start'}
						key={item.key}
						gridTemplateColumns={'30px 1fr'}
						background={
							currentThread === item.key ? base700 : base800
						}
						_hover={{ background: base700 }}
						cursor={'pointer'}
						onClick={() => {
							setCurrentThread(item.key)
						}}
						py={4}
						px='10px'
						gap={2}
						fontWeight={'400'}
						alignContent={'center'}
					>
						<Img
							borderRadius={'20px'}
							w={'30px'}
							src={item.image}
						/>
						<Text textAlign={'initial'} isTruncated>
							{item.name}
						</Text>
					</Button>
				))}
			</Flex>

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
			</Flex>
		</Flex>
	)
}

const LeftSideBarDrawer = ({
	isOpenDrawer,
	onCloseDrawer,
	currentThread,
	setCurrentThread,
}) => {
	const { base800, base700, base } = useColors()
	const { colorMode, toggleColorMode } = useColorMode()

	const [searchTerm, setSearchTerm] = useState('')

	const filteredPersonas = personalDirectory?.filter((e) =>
		e.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

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
				<Flex flexDir={'column'} gap={2} p={6}>
					<Heading fontSize={'2xl'} fontWeight={'400'}>
						personas
					</Heading>
					<Box
						borderTop='2px'
						borderColor='black.900'
						w={'100%'}
					></Box>

					<Search
						title='search personas'
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>

					<Box
						borderTop='2px'
						borderColor='black.900'
						w={'100%'}
					></Box>
				</Flex>

				<Flex
					flexDir={'column'}
					gap={2}
					px={6}
					//maxH={'400px'}
					overflowY='auto'
					overflowX='hidden'
				>
					{filteredPersonas?.map((item, index) => (
						<Button
							index={index}
							display={'grid'}
							justifyContent={'flex-start'}
							key={item.key}
							gridTemplateColumns={'30px 1fr'}
							background={
								currentThread === item.key ? base700 : base800
							}
							_hover={{ background: base700 }}
							cursor={'pointer'}
							onClick={() => {
								setCurrentThread(item.key)
							}}
							py={4}
							px='10px'
							gap={2}
							fontWeight={'400'}
							alignContent={'center'}
						>
							<Img
								borderRadius={'20px'}
								w={'30px'}
								src={item.image}
							/>
							<Text textAlign={'initial'} isTruncated>
								{item.name}
							</Text>
						</Button>
					))}
				</Flex>

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
				</Flex>
			</DrawerContent>
		</Drawer>
	)
}
