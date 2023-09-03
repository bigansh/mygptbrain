import { useColors } from '@/utils/colors'
import React, { useRef, useState } from 'react'
import {
	Button,
	Flex,
	Heading,
	Spinner,
	Text,
	Tooltip,
	useToast,
} from '@chakra-ui/react'
import { useThreads } from '@/context'
import { deleteChat, deleteDoc, getDoc, getUser } from '@/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BsLink } from 'react-icons/bs'
import { LuDelete } from 'react-icons/lu'
import { DeleteIcon, LinkIcon } from '@/icons'
import { useRouter } from 'next/navigation'
import { logtail } from '@/app/providers'
const DocumentWrapper = ({ isSidebarOpen }) => {
	const toast = useToast()
	const { base, text } = useColors()
	const {
		setCurrentThread,
		currentDocument,
		setCurrentDocument,
		setCurrentView,
	} = useThreads()
	const queryClient = useQueryClient()

	const { data: userData } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	})

	const { data: documentData } = useQuery({
		queryKey: ['documents', currentDocument],
		queryFn: () =>
			getDoc({
				profile_id: userData?.profile_id,
				document_id: currentDocument,
			}),
		enabled: currentDocument !== '' && userData?.profile_id ? true : false,

		onError: (error) => {
			logtail.info('Error getting document', error)
			logtail.flush()
		},
	})
	console.log(documentData, 'error here')
	const { isLoading: deleteDocIsLoading, mutate: deleteDocMutate } =
		useMutation({
			mutationFn: () =>
				deleteDoc({
					profile_id: userData?.profile_id,
					document_id: currentDocument,
				}),
			onSuccess: () => {
				queryClient.invalidateQueries(['documents'])
				toast({
					title: 'Document deleted',
					position: 'top',
					variant: 'solid',
					status: 'success',
					duration: 3000,
				})
				setCurrentDocument('')
				setCurrentThread('new')
				setCurrentView('chat')
			},
			onError: (error) => {
				logtail.info('Error deleting document', error)
				logtail.flush()
				toast({
					title: 'Error deleting document',
					position: 'top',
					variant: 'solid',
					status: 'error',
					duration: 3000,
				})
			},
		})

	const router = useRouter()

	return documentData ? (
		<Flex
			flexDir={'column'}
			transition={'all 0.5s ease-in'}
			background={base}
			h={'100vh'}
			overflowY='auto'
			overflowX='hidden'
			gap={4}
			p={6}
			w={['100%', isSidebarOpen ? '60vw' : '80vw']}
			maxW={['100%', isSidebarOpen ? '60vw' : '80vw']}
			margin={'auto'}
			mt={['50px', 'auto']}
		>
			<Flex
				flexDir={'column'}
				w={['100%', '65vw']}
				minW={['100%', '55vw']}
				maxW={['100%', '65vw']}
				mx={'auto'}
			>
				{' '}
				<Flex justifyContent={'space-between'}>
					<Heading fontSize={'2xl'} fontWeight={600}>
						{documentData[0]?.heading}
					</Heading>
					<Flex gap={2}>
						{documentData[0].documentMetadata.url && (
							<Tooltip
								label='Link to document'
								aria-label='A tooltip'
							>
								<Flex
									cursor={'pointer'}
									onClick={() =>
										router.push(
											documentData[0]?.documentMetadata
												?.url
										)
									}
								>
									<LinkIcon fill={text} />
								</Flex>
							</Tooltip>
						)}
						<Tooltip label='Delete document' aria-label='A tooltip'>
							<Flex cursor={'pointer'} onClick={deleteDocMutate}>
								{deleteDocIsLoading ? (
									<Spinner />
								) : (
									<DeleteIcon fill='rgba(255, 0, 0, 1)' />
								)}
							</Flex>
						</Tooltip>
					</Flex>
				</Flex>
				<div
					dangerouslySetInnerHTML={{ __html: documentData[0]?.body }}
				/>
				<Text whiteSpace={'break-spaces'}>{documentData[0]?.body}</Text>
			</Flex>
		</Flex>
	) : (
		<Flex
			flexDir={'column'}
			transition={'all 0.5s ease-in'}
			background={base}
			h={'100vh'}
			gap={4}
			p={6}
			w={isSidebarOpen ? '60vw' : '80vw'}
			maxW={isSidebarOpen ? '60vw' : '80vw'}
			margin={'auto'}
		>
			<Spinner margin={'auto'} />
		</Flex>
	)
}

export default DocumentWrapper
