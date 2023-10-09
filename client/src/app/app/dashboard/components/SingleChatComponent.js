import { ChatLogoIcon, ChatUserIcon } from '@/icons'
import { useColors } from '@/utils/colors'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const SingleChatComponent = ({ message }) => {
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
						<Text marginBlock={'auto'} fontSize={['sm', 'md']}>
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

export default SingleChatComponent
