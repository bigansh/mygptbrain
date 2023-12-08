'use client'

import { Flex, Box, useDisclosure, Text, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BsLayoutSidebarInsetReverse } from 'react-icons/bs'
import {
	ChatWrapper,
	DocumentWrapper,
	RightSidebar,
	LeftSidebar,
	OnboardingModal,
	LeftSideBarDrawer,
} from './components'
import { useColors } from '@/utils/colors'
import { useThreads } from '@/context'
import { AiOutlineMenu, AiOutlinePlus } from 'react-icons/ai'
import { getUser } from '@/api'
import { useQuery } from '@tanstack/react-query'
import mixpanel from 'mixpanel-browser'
import { useRouter } from 'next/navigation'
import { PaymentModal } from '@/utils/valid-http-check'
import { useThreadData } from '@/app/query-hooks'

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL, {
	track_pageview: true,
	persistence: 'localStorage',
})
const Dashboard = () => {
	const router = useRouter()
	const toast = useToast()

	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const { currentThread, setCurrentThread, currentView, setCurrentView } =
		useThreads()

	const { data, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
		onSuccess: (data) => {
			mixpanel.identify(data?.profile_id)
		},
	})

	const { base, base800, base600, base700, text } = useColors()

	const { data: threadData } = useThreadData({
		currentThread,
		enabled: currentThread !== '' && currentThread !== 'new' ? true : false,
	})

	const {
		isOpen: isOpenDrawer,
		onOpen: onOpenDrawer,
		onClose: onCloseDrawer,
	} = useDisclosure()

	const {
		isOpen: isPaymentModalOpen,
		onOpen: onPaymentModalOpen,
		onClose: onPaymentModalClose,
	} = useDisclosure()

	const {
		isOpen: isOpenOnboarding,
		onOpen: onOpenOnboarding,
		onClose: onCloseOnboarding,
	} = useDisclosure({
		defaultIsOpen: false,
	})

	useEffect(() => {
		if (!localStorage.getItem('x-session-token')) {
			toast({
				title: 'please login to continue',
				position: 'top',
				variant: 'subtle',
				status: 'info',
				duration: 3000,
			})
			router.push('/onboarding')
		}
		if (currentView == 'document') {
			setIsSidebarOpen(false)
		}
	}, [currentView])

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
				borderBottom={`1px solid #2c2c2c`}
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				<AiOutlineMenu onClick={onOpenDrawer} />
				{currentThread !== 'new' &&
					currentView == 'chat' &&
					threadData && (
						<Text maxW={'60%'} isTruncated fontSize={'md'}>
							{threadData[0]?.chat_name}
						</Text>
					)}
				<AiOutlinePlus
					onClick={() => {
						setCurrentThread('new')
						setCurrentView('chat')
					}}
				/>
			</Box>
			<LeftSidebar onPaymentModalOpen={onPaymentModalOpen} />
			{currentView == 'chat' ? (
				<ChatWrapper isSidebarOpen={isSidebarOpen} />
			) : (
				<DocumentWrapper
					isSidebarOpen={isSidebarOpen}
					onPaymentModalOpen={onPaymentModalOpen}
				/>
			)}
			<RightSidebar
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
				onPaymentModalOpen={onPaymentModalOpen}
			/>
			{currentView == 'chat' && currentThread !== 'new' && (
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
			<OnboardingModal
				isOpenOnboarding={isOpenOnboarding}
				onOpenOnboarding={onOpenOnboarding}
				onCloseOnboarding={onCloseOnboarding}
				onPaymentModalOpen={onPaymentModalOpen}
			/>
			<LeftSideBarDrawer
				isOpenDrawer={isOpenDrawer}
				onCloseDrawer={onCloseDrawer}
				onOpenDrawer={onOpenDrawer}
				onPaymentModalOpen={onPaymentModalOpen}
			/>
			<PaymentModal
				isPaymentModalOpen={isPaymentModalOpen}
				onPaymentModalClose={onPaymentModalClose}
			/>
		</Flex>
	)
}

export default Dashboard
