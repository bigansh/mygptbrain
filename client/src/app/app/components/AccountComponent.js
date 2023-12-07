'use client'
import { deleteUser, getUser, updatePasswordFunc } from '@/api'
import { logtail } from '@/app/providers'
import { useColors } from '@/utils/colors'
import { removeTokens } from '@/utils/helpers'
import {
	Flex,
	FormLabel,
	Input,
	Button,
	useDisclosure,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	ModalContent,
	ModalOverlay,
	ModalCloseButton,
	useToast,
	Spinner,
} from '@chakra-ui/react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const AccountComponent = () => {
	const router = useRouter()
	const toast = useToast()
	const { base, base800, base900, text, redbg, base700 } = useColors()
	const {
		isOpen: isOpenDelete,
		onOpen: onOpenDelete,
		onClose: onCloseDelete,
	} = useDisclosure()

	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
		enabled: false,
	})

	const { mutate: deleteAcMutate, isLoading: deleteAcIsLoading } =
		useMutation({
			mutationFn: () => deleteUser(data?.profile_id),
			onSuccess: (data) => {
				// toast({
				// 	title: 'Account deleted successfully!',
				// 	position: 'top',
				// 	variant: 'subtle',
				// 	status: 'success',
				// 	duration: 3000,
				// })
				onCloseDelete()
				removeTokens()
				router.push('/')
			},
			onError: (error) => {
				toast({
					title: 'error deleting account!',
					position: 'top',
					variant: 'subtle',
					status: 'error',
					duration: 3000,
				})

				removeTokens()
				logtail.info('Error deleting account', error)
				logtail.flush()
				router.push('/')
			},
		})

	const [userDetails, setUserDetails] = useState({
		name: data?.name || '',
		email: data?.email || '',
		oldPassword: '',
		newPassword: '',
	})

	const { mutate: updatePassMutate, isLoading: updatePassIsLoading } =
		useMutation({
			mutationFn: (pass) =>
				updatePasswordFunc({
					profile_id: data?.profile_id,
					userObject: {
						authDetails: {
							password: pass,
						},
					},
				}),
			onSuccess: (data) => {
				toast({
					title: 'password updated successfully',
					position: 'top',
					variant: 'subtle',
					status: 'success',
					duration: 3000,
				})
			},
			onError: (error) => {
				toast({
					title: 'error updating the password',
					position: 'top',
					variant: 'subtle',
					status: 'error',
					duration: 3000,
				})

				removeTokens()
				logtail.info('Error deleting the password', error)
				logtail.flush()
			},
		})

	const [updatePassword, setUpdatePassword] = useState(false)

	return (
		<Flex flexDir={'column'} mt={2} p={4} mb={6} w={'100%'}>
			<FormLabel fontSize={'xl'} fontWeight={'400'} mb={0}>
				name
			</FormLabel>
			<Input
				id='name'
				type='name'
				value={userDetails.name}
				fontSize={'18px'}
				bg={base800}
				p={2.5}
				w={['100%', '400px']}
				contentEditable={false}
				disabled
				opacity={1}
			/>
			<FormLabel fontSize={'xl'} fontWeight={'400'} mb={0} mt={4}>
				email
			</FormLabel>
			<Input
				id='email'
				type='email'
				value={userDetails.email}
				fontSize={'18px'}
				bg={base800}
				p={2.5}
				w={['100%', '400px']}
				contentEditable={false}
				disabled
			/>

			{updatePassword && (
				<>
					<FormLabel fontSize={'xl'} fontWeight={'400'} mb={0} mt={4}>
						old password
					</FormLabel>
					<Input
						id='password'
						type='password'
						autoComplete='false'
						value={userDetails.oldPassword}
						onChange={(e) =>
							setUserDetails({
								...userDetails,
								oldPassword: e.target.value,
							})
						}
						fontSize={'18px'}
						bg={base800}
						p={2.5}
						w={['100%', '400px']}
					/>

					<FormLabel fontSize={'xl'} fontWeight={'400'} mb={0} mt={4}>
						new password
					</FormLabel>
					<Input
						id='password'
						type='password'
						autoComplete='false'
						value={userDetails.newPassword}
						onChange={(e) =>
							setUserDetails({
								...userDetails,
								newPassword: e.target.value,
							})
						}
						fontSize={'18px'}
						bg={base800}
						p={2.5}
						w={['100%', '400px']}
					/>
				</>
			)}
			<Button
				//cursor={'pointer'} onClick={cursor={'pointer'} onClick}
				bg={base700}
				justifyContent={'space-between'}
				fontWeight={'400'}
				w={'fit-content'}
				onClick={() => {
					if (
						userDetails.newPassword == '' &&
						userDetails.oldPassword == ''
					) {
						setUpdatePassword(true)
					} else {
						if (
							userDetails.newPassword !== userDetails.oldPassword
						) {
							toast({
								title: 'New password and old password has to be the same',
								position: 'top',
								variant: 'subtle',
								status: 'error',
								duration: 3000,
							})
						} else {
							updatePassMutate(userDetails.newPassword)
						}
					}
				}}
				mt={8}
				py={[4, 'unset']}
			>
				{updatePassIsLoading ? <Spinner /> : 'update password'}
			</Button>
			<Flex gap={5} mt={4} pb={4}>
				<Button
					cursor={'pointer'}
					onClick={() => {
						localStorage.removeItem('x-session-token')
						router.push('/onboarding')
						toast({
							title: 'user logged out',
							position: 'top',
							variant: 'subtle',
							status: 'info',
							duration: 3000,
						})
					}}
					bg={redbg}
					color={'#000'}
					justifyContent={'space-between'}
					fontWeight={'400'}
				>
					logout
				</Button>
				<Button
					cursor={'pointer'}
					onClick={onOpenDelete}
					bg={redbg}
					color={'#000'}
					justifyContent={'space-between'}
					fontWeight={'400'}
				>
					delete account
				</Button>
			</Flex>
			<Modal
				closeOnOverlayClick={false}
				isOpen={isOpenDelete}
				onClose={onCloseDelete}
				size={'md'}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						Are sure you want to delete your account
					</ModalHeader>
					<ModalCloseButton />

					<ModalFooter>
						<Button bg={'#FFDFDF'} mr={3} onClick={deleteAcMutate}>
							{deleteAcIsLoading ? <Spinner /> : 'Delete'}
						</Button>
						<Button cursor={'pointer'} onClick={onCloseDelete}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	)
}

export default AccountComponent
