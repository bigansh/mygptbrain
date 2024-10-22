import { Flex, Grid, Text, useDisclosure } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { connectPlatform, getUser } from '@/api'
import { DriveIcon, NotionIcon, PockketIcon, RedditIcon } from '@/icons'
import { useUserData } from '@/app/query-hooks'
import { PaymentModal, upgradeFunction } from '@/utils/valid-http-check'
import { useToastManager } from '@/utils/customToasts'

const PlatformComponent = () => {
	const {
		isOpen: isPaymentModalOpen,
		onOpen: onPaymentModalOpen,
		onClose: onPaymentModalClose,
	} = useDisclosure()
	const { data } = useUserData()
	return (
		<Grid
			h={'fit-content'}
			gridTemplateColumns={'1fr 1fr'}
			gridTemplateRows={'1fr 1fr'}
			flexDir={'column'}
			mt={2}
			p={4}
			gap={5}
			display={['flex', 'grid']}
			flexDirection={['column', 'row']}
		>
			<PlatformCard
				name='reddit'
				state={data?.auth?.reddit_id ? 'reauthorize' : 'connect'}
				color={
					data?.auth?.reddit_id ? '#58DD58' : 'rgba(255, 67, 0, 1)'
				}
				icon={<RedditIcon fill={'rgba(255, 255, 255, 1)'} />}
				onOpen={onPaymentModalOpen}
			/>

			<PlatformCard
				name='notion'
				state={data?.auth?.notion_id ? 'reauthorize' : 'connect'}
				color={
					data?.auth?.notion_id ? '#58DD58' : 'rgba(55, 53, 48, 1)'
				}
				icon={<NotionIcon fill={'rgba(255, 255, 255, 1)'} />}
				onOpen={onPaymentModalOpen}
				disabled='true'
			/>

			<PlatformCard
				name='drive'
				state={data?.auth?.google_id ? 'reauthorize' : 'connect'}
				color={
					data?.auth?.google_id ? '#58DD58' : 'rgba(255, 208, 75, 1)'
				}
				icon={<DriveIcon fill={'rgba(255, 255, 255, 1)'} />}
				onOpen={onPaymentModalOpen}
			/>

			<PlatformCard
				name='pocket'
				state={data?.auth?.pocket_id ? 'reauthorize' : 'connect'}
				color={
					data?.auth?.pocket_id ? '#58DD58' : 'rgba(213, 77, 87, 1)'
				}
				icon={<PockketIcon fill={'rgba(255, 255, 255, 1)'} />}
				onOpen={onPaymentModalOpen}
			/>

			<PaymentModal
				isPaymentModalOpen={isPaymentModalOpen}
				onPaymentModalClose={onPaymentModalClose}
				data={data}
			/>
		</Grid>
	)
}

export default PlatformComponent

const PlatformCard = ({ name, color, icon, state, onOpen }) => {
	const { isLoading, data } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	})
	const showToast = useToastManager()
	return (
		<Flex
			flexDir={'column'}
			gap={2}
			cursor={'pointer'}
			onClick={() =>
				upgradeFunction({
					status: data?.userMetadata?.subscription_status,
					usernextFunc: () => {
						connectPlatform({
							platform: name,
							profileId: data?.profile_id,
						})
					},
					onOpen: () => {
						showToast('PLATFORMS')
						onOpen()
					},
				})
			}
		>
			<Text fontSize={'xl'} fontWeight={'400'}>
				{name}
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
				<Text>{state}</Text>
				{icon}
			</Flex>
		</Flex>
	)
}
