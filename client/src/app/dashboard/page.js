'use client'

import {
	Button,
	Flex,
	Heading,
	Box,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
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
	InputLeftElement,
	InputRightElement,
  useToast,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { BsLayoutSidebarInsetReverse } from 'react-icons/bs'
import {
	ChatWrapper,
	DocumentWrapper,
	LeftSidebar,
	RightSideBar,
} from './components'
import { useColors } from '@/utils/colors'
import { useThreads } from '@/context'
import { AiOutlineCloudUpload, AiOutlineLink } from 'react-icons/ai'
import { connectPlatform, getUser, uploadDoc } from '@/api'
import { FaReddit, FaTwitter } from 'react-icons/fa'
import { PiNotionLogoLight } from 'react-icons/pi'
import { TbBrandOnedrive } from 'react-icons/tb'
import { LuPocket } from 'react-icons/lu'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const Dashboard = () => {
	const [platformModal, setPlatformModal] = useState(false)
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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

	const { base, base800, base700, text } = useColors()
	const {
		isOpen: isOpenOnboarding,
		onOpen: onOpenOnboarding,
		onClose: onCloseOnboarding,
	} = useDisclosure({ defaultIsOpen: true })

	return (
		<Flex
			w={'100vw'}
			maxW={'100vw'}
			h={'100vh'}
			color={text}
			pos={'relative'}
		>
			{/* <button onClick={onOpenOnboarding}>close open modal</button> */}
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
			<Button
				p={'10px'}
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				position={'absolute'}
				right={'0'}
				bottom={0}
				borderLeftRadius={4}
				borderRightRadius={0}
				background={base700}
				display={isSidebarOpen ? 'none' : 'flex'}
			>
				{' '}
				<BsLayoutSidebarInsetReverse fontSize={24} />
			</Button>
			<OnboardingModal
				isOpenOnboarding={isOpenOnboarding}
				onOpenOnboarding={onOpenOnboarding}
				onCloseOnboarding={onCloseOnboarding}
			/>
		</Flex>
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
	const { data, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	})
	const handleLinkChange = (e) => {
		setLink(e.target.value)
	}

	const {
		data: uploadDocData,
		mutate: uploadDocMutate,
		isLoading: uploadDocIsLoading,
	} = useMutation({
		mutationFn: () => uploadDoc(uploadRef.current.files[0]),

		onSuccess: (data) => {
			queryClient.invalidateQueries(['documents'])
      onCloseOnboarding()
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
		},
	})

	const { base, base800, base700, text } = useColors()
	return (
		<Modal
			onClose={onCloseOnboarding}
			size={'6xl'}
			isOpen={isOpenOnboarding}
			isCentered
		>
			<ModalOverlay />
			<ModalContent h={'80vh'}>
				<ModalCloseButton onClick={onCloseOnboarding} />
				<ModalBody
					w={'60%'}
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
								fontSize={'2xl'}
								fontWeight={'400'}
								textAlign={'center'}
							>
								welcome to mygptbrain! please...
							</Heading>
							<Box
								border={'1px solid black'}
								w={'100%'}
								m={'auto'}
								my={2}
							></Box>

							<Grid gridTemplateColumns={'1fr 1fr 1fr'} gap={5}>
								{' '}
								{!data?.auth?.twitter_id && (
									<PlatformCard
										title='twitter'
										color='#00ACEE'
										icon={<FaTwitter />}
									/>
								)}
								{!data?.auth?.reddit_id && (
									<PlatformCard
										title='reddit'
										color='#FF4300'
										icon={<FaReddit />}
									/>
								)}
								{!data?.auth?.notion_id && (
									<PlatformCard
										title='notion'
										color='#373530'
										icon={<PiNotionLogoLight />}
									/>
								)}
								{!data?.auth?.google_id && (
									<PlatformCard
										title='ondrive'
										color='#0078D4'
										icon={<TbBrandOnedrive />}
									/>
								)}
								{/* <Button
							title='whatsapp'
							classes='bg-yellow-500 hover:bg-yellow-600'
						/> */}
								{!data?.auth?.pocket_id && (
									<PlatformCard
										title='pocket'
										color='#D54D57'
										icon={<LuPocket />}
									/>
								)}
							</Grid>

							<Box position='relative' py={6} fontSize={'18px'}>
								<Divider
									bg={'black'}
									borderColor={'black'}
									rounded={'md'}
									borderWidth={'1px'}
								/>
								<AbsoluteCenter px='4' bg={'white'}>
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
									onChange={() => uploadDocMutate()}
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
										type='text'
										value={link}
										placeholder='paste a link'
										onChange={handleLinkChange}
										background={base700}
										_hover={{ background: base700 }}
									/>
									<InputRightElement
										h={'100%'}
										display={'flex'}
										justifyContent={'center'}
										alignItems={'center'}
									>
										<AiOutlineLink />
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
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	})

	return (
		<Flex
			flexDir={'column'}
			gap={2}
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
				gap={20}
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
