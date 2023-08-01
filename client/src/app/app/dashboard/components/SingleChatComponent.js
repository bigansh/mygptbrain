//import { GPTBrain, UserSvg } from '@/app/assets'
import { ChatLogoIcon, ChatUserIcon } from '@/icons'
import { useColors } from '@/utils/colors'
import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import { LuBrainCircuit } from 'react-icons/lu'
import { PiUserCircleLight } from 'react-icons/pi'

const SingleChatComponent = ({ message }) => {
	const { base, base800, base700, text } = useColors()
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
						<Text marginBlock={'auto'} fontSize={['sm', 'auto']}>
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
						<Box>
							<ChatLogoIcon fill={text} size={30} />
						</Box>

						<Text
							whiteSpace={'break-spaces'}
							marginBlock={'auto'}
							fontSize={['sm', 'auto']}
						>
							{message.llm}
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</>
	)
}

export default SingleChatComponent
