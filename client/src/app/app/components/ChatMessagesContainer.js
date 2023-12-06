import React, { useEffect } from 'react'
import SingleChatComponent from './SingleChatComponent'
import { useQuery } from '@tanstack/react-query'
import { useThreads } from '@/context'
import { readChat } from '@/api'
import { Flex, Spinner } from '@chakra-ui/react'
import { logtail } from '@/app/providers'
import { useUserData } from '@/app/query-hooks'
import { placeholderData } from '@/data'

const ChatMessagesContainer = ({ inputValue, setInputValue, divRef }) => {
	const { currentThread } = useThreads()
	const { data: userData } = useUserData()

	const { data: threadData, isLoading: threadIsLoading } = useQuery({
		queryKey: ['threads', currentThread],
		queryFn: () =>
			readChat({
				profile_id: userData?.profile_id,
				chat_id: currentThread,
			}),
		enabled:
			currentThread !== '' &&
			currentThread !== 'new' &&
			userData?.profile_id
				? true
				: false,
		onSuccess: (data) => {
			//divRef?.current?.scrollIntoView({ behavior: 'smooth' })
		},
		onError: (error) => {
			logtail.info('Error getting thread', error)
			logtail.flush()
		},
	})
	useEffect(() => {
		divRef?.current?.scrollIntoView({ behavior: 'smooth' })
	}, [threadData])

	return threadIsLoading && currentThread !== 'new' ? (
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
		<Flex flexDir={'column'} overflowY='auto' overflowX='hidden' w={'100%'}>
			{currentThread == 'new' &&
			(threadData == undefined || threadData.length == 0)
				? placeholderData?.chat_array?.map((message, index) => (
						<SingleChatComponent message={message} />
				  ))
				: threadData &&
				  threadData[0]?.chat_array?.map((message, index) => (
						<SingleChatComponent message={message} />
				  ))}

			<Flex ref={divRef}></Flex>
		</Flex>
	)
}

export default ChatMessagesContainer
