import { Flex, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/api'
import { DriveIcon, NotionIcon, PockketIcon, RedditIcon } from '@/icons'

const PlatformComponent = () => {
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	})
	return (
		<Flex flexDir={'column'} mt={2} p={4} gap={5}>
			<Flex gap={5}>
				<PlatformCard
					name='reddit'
					state={data?.auth?.reddit_id ? 'reauthorize' : 'connect'}
					color='rgba(255, 67, 0, 1)'
					icon={<RedditIcon fill={'rgba(255, 255, 255, 1)'} />}
				/>

				<PlatformCard
					name='notion'
					state={data?.auth?.notion_id ? 'reauthorize' : 'connect'}
					color='rgba(55, 53, 48, 1)'
					icon={<NotionIcon fill={'rgba(255, 255, 255, 1)'} />}
				/>
			</Flex>
			<Flex gap={5}>
				<PlatformCard
					title='ondrive'
					state={data?.auth?.google_id ? 'reauthorize' : 'connect'}
					color='rgba(255, 208, 75, 1)'
					icon={<DriveIcon fill={'rgba(255, 255, 255, 1)'} />}
				/>

				<PlatformCard
					title='pocket'
					state={data?.auth?.pocket_id ? 'reauthorize' : 'connect'}
					color='rgba(213, 77, 87, 1)'
					icon={<PockketIcon fill={'rgba(255, 255, 255, 1)'} />}
				/>
			</Flex>
		</Flex>
		// <div>
		//   <h1>Connect Accounts</h1>
		//   <ConnectButtons />

		//   <h1>Reauthorize Accounts</h1>
		//   <ReauthorizeButtons />
		// </div>
	)
}

export default PlatformComponent

const PlatformCard = ({ name, color, icon, state }) => {
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	})

	return (
		<Flex
			flexDir={'column'}
			gap={2}
			cursor={'pointer'}
			onClick={() =>
				connectPlatform({
					platform: name,
					profileId: data?.profile_id,
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
			>
				<Text>{state}</Text>
				{icon}
			</Flex>
		</Flex>
	)
}