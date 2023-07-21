//import { GPTBrain, UserSvg } from '@/app/assets'
import { ChatLogoIcon, ChatUserIcon } from '@/icons'
import { useColors } from '@/utils/colors'
import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import { LuBrainCircuit } from 'react-icons/lu'
import { PiUserCircleLight } from 'react-icons/pi'
import Typewriter from 'typewriter-effect'

const SingleChatComponent = ({ message, isLast, isPlaceholder, divRef }) => {
	const { base, base800, base700, text } = useColors()
	return (
		<>
			<Flex flexDir={'column'}>
				<Flex justifyContent={'start'} gap={2} bg={base700} p={5}>
					<Flex
						gap={2}
						w={'65vw'}
						minW={'55vw'}
						maxW={'65vw'}
						margin={'auto'}
					>
						<Box>
							<ChatUserIcon fill={text} />
						</Box>
						<Text marginBlock={'auto'}>{message.user}</Text>
					</Flex>
				</Flex>
				<Flex justifyContent={'start'} gap={2} p={5}>
					<Flex
						gap={2}
						w={'65vw'}
						minW={'55vw'}
						maxW={'65vw'}
						margin={'auto'}
					>
						<Box>
							<ChatLogoIcon fill={text} />
						</Box>

						<Text whiteSpace={'break-spaces'} marginBlock={'auto'}>
							{isLast && !isPlaceholder ? (
								// <Typist key={message.llm} avgTypingDelay={1} blink={true}>
								//   {message.llm}
								// </Typist>
								<Typewriter
									
									onInit={(typewriter) => {
										typewriter
											.typeString(message?.llm)
											.start()
											.callFunction(() => {
												divRef?.current.scrollIntoView({
													behavior: 'smooth',
												})
											})
									}}
									options={{ delay: 0.0001  , cursor: ''}}
								/>
							) : (
								message.llm
							)}
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</>
	)
}

export default SingleChatComponent
