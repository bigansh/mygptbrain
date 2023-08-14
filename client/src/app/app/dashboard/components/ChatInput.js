import { createChat, updateChat } from '@/api'
import { useThreads } from '@/context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import { PiPaperPlaneTiltLight } from 'react-icons/pi'

import ResizeTextarea from 'react-textarea-autosize'
import {
	Flex,
	Box,
	Text,
	Input,
	Textarea,
	CircularProgress,
	useToast,
} from '@chakra-ui/react'
import { useColors } from '@/utils/colors'
import { logtail } from '@/app/providers'
const ChatInput = ({ inputValue, setInputValue, divRef }) => {
	const queryClient = useQueryClient()

	const ref = useRef()
	const { currentThread, setCurrentThread } = useThreads()
	const { base, base800, base700, text } = useColors()
	const toast = useToast()
	const {
		data,
		isLoading: addIsLoading,
		mutate: addMutate,
	} = useMutation({
		mutationFn: () => createChat(inputValue),
		onMutate: () => {
			queryClient.setQueryData(['threads', 'new'], (prev) => {
				return [
					{
						chat_array: [{ user: inputValue, llm: 'loading...' }],
					},
				]
			})
		},
		onSuccess: (data) => {
			queryClient.setQueryData(['threads'], (oldData) => [
				...oldData,
				data,
			])
			queryClient.setQueryData(['threads', 'new'], (prev) => {
				return []
			})
			setCurrentThread(data.chat_id)
			toast({
				title: 'New chat created',
				position: 'top',
				variant: 'left-accent',
				status: 'success',
				duration: 3000,
			})
		},
		onError: (error) => {
			toast({
				title: 'Error creating chat',
				position: 'top',
				variant: 'left-accent',
				status: 'success',
				duration: 3000,
			})

			logtail.info('Error creating chat', error)
			logtail.flush()
		},
	})

	const {
		data: updateData,
		mutate: updateMutate,
		isLoading: updateIsLoading,
	} = useMutation({
		mutationFn: () =>
			updateChat({
				prompt: inputValue,
				chat_id: currentThread,
			}),

		onMutate: () => {
			queryClient.setQueryData(['threads', currentThread], (prev) => {
				return [
					{
						...prev[0],
						chat_array: [
							...prev[0].chat_array,
							{ user: inputValue, llm: 'loading...' },
						],
					},
				]
			})
			divRef?.current.scrollIntoView({ behavior: 'smooth' })
		},
		onSuccess: (data) => {
			setInputValue('')
			queryClient.setQueryData(['threads', currentThread], (prev) => {
				return [data]
			})
			divRef?.current.scrollIntoView({ behavior: 'smooth' })
		},

		onError: (error) => {
			logtail.info('Error getting thread', error)
			logtail.flush()
		},
	})

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
			currentThread == 'new' ? addMutate() : updateMutate()
		}
	}

	if (updateIsLoading || addIsLoading) {
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
					placeholder={['ask your second brain, a question!']}
					value={inputValue}
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
					overflow='scroll'
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
						currentThread == 'new' ? addMutate() : updateMutate()
					}}
				>
					{updateIsLoading || addIsLoading ? (
						<CircularProgress
							size={30}
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

export default ChatInput
