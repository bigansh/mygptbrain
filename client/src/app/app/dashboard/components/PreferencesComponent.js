'use client'
import { deleteUser, getUser, updatePromptTemplate } from '@/api'
import { logtail } from '@/app/providers'
import {
	AddIcon,
	ChevIcon,
	ChevRevIcon,
	CloudUploadIcon,
	RotateIcon,
} from '@/icons'
import { useColors } from '@/utils/colors'
import { removeTokens } from '@/utils/helpers'
import {
	Flex,
	Input,
	Text,
	Button,
	useDisclosure,
	useToast,
	Spinner,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Textarea,
} from '@chakra-ui/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import FunctionalBtn from './FunctionalBtn'
import { useUserData } from '@/app/query-hooks'
import { FiCheck } from 'react-icons/fi'

const PreferencesComponent = () => {
	const router = useRouter()
	const toast = useToast()
	const queryClient = useQueryClient()
	const { isOpen, onToggle, onClose } = useDisclosure()
	const { base, base800, base700, base600, text, redbg } = useColors()
	const {
		isOpen: isOpenDelete,
		onOpen: onOpenDelete,
		onClose: onCloseDelete,
	} = useDisclosure()

	const { data: userData } = useUserData()

	const [currentTemplate, setCurrentTemplate] = useState(0)
	const [promptValue, setPromptValue] = useState(
		userData?.userMetadata?.prompt_templates[currentTemplate]
	)

	const { isLoading: isLoadingUpdate, mutate: mutateUpdate } = useMutation({
		mutationFn: () =>
			updatePromptTemplate({
				prompt_templates: userData?.userMetadata?.prompt_templates.map(
					(e, index) => (index == currentTemplate ? promptValue : e)
				),
			}),

		onSuccess: (data) => {
			queryClient.invalidateQueries(['user'])
			setPromptValue(
				data?.userMetadata?.prompt_templates[currentTemplate]
			)
			toast({
				title: 'prompt updated',
				position: 'top',
				variant: 'subtle',
				status: 'success',
				duration: 3000,
			})
		},

		onError: (error) => {
			logtail.info('Error updating prompt', error)
			logtail.flush()
		},
	})

	const { isLoading: isLoadingDefault, mutate: mutateDefault } = useMutation({
		mutationFn: () =>
			updatePromptTemplate({
				default_prompt_template: String(currentTemplate),
			}),

		onSuccess: (data) => {
			queryClient.invalidateQueries(['user'])

			toast({
				title: 'default prompt updated',
				position: 'top',
				variant: 'subtle',
				status: 'success',
				duration: 3000,
			})
		},

		onError: (error) => {
			logtail.info('Error updating default prompt', error)
			logtail.flush()
		},
	})

	return (
		<Flex flexDir={'column'} mt={2} p={4}>
			<Text fontSize={'xl'} fontWeight={'400'}>
				prompt templates
			</Text>
			<Flex maxW={'300px'} w={'300px'} mt={2.5}>
				<Popover
					placement='bottom-start'
					isOpen={isOpen}
					w={'300px'}
					returnFocusOnClose={false}
					onClose={onClose}
				>
					<PopoverTrigger>
						<Button
							cursor={'pointer'}
							onClick={onToggle}
							_hover={{ bg: base600 }}
							bg={base700}
							justifyContent={'space-between'}
							fontWeight={'400'}
							w={'100%'}
							borderBottomRadius={isOpen && '0px'}
							isTruncated
						>
							<Text textAlign={'initial'} isTruncated>
								template {currentTemplate + 1}
							</Text>

							{isOpen ? (
								<ChevRevIcon fill={text} />
							) : (
								<ChevIcon fill={text} />
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent
						boxShadow={'0px'}
						mt={'-0.5rem'}
						borderTopRadius={'0px'}
						borderTop={`1px solid ${text}`}
						background={base700}
						w={'300px'}
						style={{ 'backdrop-filter': 'blur(5px)' }}
						className='documentupload'
					>
						{userData?.userMetadata?.prompt_templates?.map(
							(e, index) => (
								<FunctionalBtn
									title={`template ${index + 1}`}
									enabled={index == currentTemplate}
									cursor={'pointer'}
									onClick={() => {
										setCurrentTemplate(index)
										setPromptValue(
											userData?.userMetadata
												?.prompt_templates[index]
										)
									}}
									icon={
										index == currentTemplate && <FiCheck />
									}
								/>
							)
						)}
					</PopoverContent>
				</Popover>
			</Flex>

			<Textarea
				id='email'
				type='email'
				value={promptValue}
				onChange={(e) => setPromptValue(e.target.value)}
				fontSize={'18px'}
				bg={base700}
				border={'0px'}
				p={2.5}
				rows={8}
				w={['100%', '500px']}
				mt={2.5}
			/>

			<Flex gap={5} mt={5}>
				<Button
					cursor={'pointer'}
					onClick={() =>
						userData?.userMetadata?.prompt_templates[
							currentTemplate
						] !== promptValue
							? mutateUpdate()
							: toast({
									title: 'nothing to update',
									position: 'top',
									variant: 'subtle',
									status: 'info',
									duration: 3000,
							  })
					}
					bg={
						userData?.userMetadata?.prompt_templates[
							currentTemplate
						] == promptValue
							? base800
							: base600
					}
					color={text}
					justifyContent={'space-between'}
					fontWeight={'400'}
				>
					{isLoadingUpdate ? <Spinner /> : 'save'}
				</Button>

				<Button
					cursor={'pointer'}
					onClick={
						currentTemplate !==
							Number(
								userData?.userMetadata?.default_prompt_template
							) && mutateDefault
					}
					bg={'rgba(88, 221, 88, 0.5)'}
					_hover={{
						opacity:
							currentTemplate ==
							Number(
								userData?.userMetadata?.default_prompt_template
							)
								? '50%'
								: '80%',
					}}
					color={'#000'}
					opacity={
						currentTemplate ==
							Number(
								userData?.userMetadata?.default_prompt_template
							) && '50%'
					}
					cursor={
						currentTemplate ==
							Number(
								userData?.userMetadata?.default_prompt_template
							) && 'not-allowed'
					}
					justifyContent={'space-between'}
					fontWeight={'400'}
				>
					{isLoadingDefault ? <Spinner /> : 'save as default'}
				</Button>
			</Flex>
		</Flex>
	)
}

export default PreferencesComponent
