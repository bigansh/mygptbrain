import { Button, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FaReddit, FaTwitter } from 'react-icons/fa'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { PiNotionLogoLight } from 'react-icons/pi'
import { AiOutlineRedo } from 'react-icons/ai'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/api'

const PlatformComponent = () => {
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	})
	return (
		<Flex flexDir={'column'} mt={2} p={4} gap={5}>
			<Flex gap={5}>
				<PlatformCard
					name='twitter'
					state={data?.auth?.twitter_id ? 'connect' : 'reauthorize'}
					color={'#00ACEE'}
					icon={<FaTwitter />}
				/>
				<PlatformCard
					name='reddit'
					state={data?.auth?.reddit_id ? 'connect' : 'reauthorize'}
					color={'#FF4300'}
					icon={<FaReddit />}
				/>
				{/* {!data?.auth?.twitter_id && ( */}

				<PlatformCard
					name='notion'
					state={data?.auth?.notion_id ? 'connect' : 'reauthorize'}
					color={'#373530'}
					icon={<PiNotionLogoLight />}
				/>
			</Flex>
			<Flex gap={5}>
				<PlatformCard
					title='ondrive'
					color='#0078D4'
					state={data?.auth?.google_id ? 'connect' : 'reauthorize'}
					icon={<TbBrandOnedrive />}
				/>

				<PlatformCard
					title='pocket'
					color='#D54D57'
					state={data?.auth?.pocket_id ? 'connect' : 'reauthorize'}
					icon={<LuPocket />}
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
