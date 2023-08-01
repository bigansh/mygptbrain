'use client'
import { deleteUser, getUser } from '@/api'
import { logtail } from '@/app/providers'
import { useColors } from '@/utils/colors'
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
	const { base, base800, base700, text, redbg } = useColors()
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
	const [userDetails, setUserDetails] = useState({
		name: data?.name || '',
		email: data?.email || '',
		oldPassword: '',
		newPassword: '',
	})

	const { mutate: deleteAcMutate, isLoading: deleteAcIsLoading } =
		useMutation({
			mutationFn: () => deleteUser(data?.profile_id),
			onSuccess: (data) => {
				toast({
					title: 'Account deleted successfully!',
					position: 'top',
					variant: 'left-accent',
					status: 'success',
					duration: 3000,
				})
				onCloseDelete()
				localStorage.removeItem('x-session-token')
				localStorage.removeItem('modal-display')
				router.push('/')
			},
			onError: (error) => {
				toast({
					title: 'Error deleting account!',
					position: 'top',
					variant: 'left-accent',
					status: 'error',
					duration: 3000,
				})

				localStorage.removeItem('x-session-token')
				localStorage.removeItem('modal-display')
				logtail.info('Error deleting account', error)
				logtail.flush()
				router.push('/')
			},
		})

	const [updatePassword, setUpdatePassword] = useState(false)
	const [showUpdatePassword, setShowUpdatePassword] = useState(false)
	const [showDeleteAccount, setShowDeleteAccount] = useState(false)

	const handleUpdatePassword = () => {
		setShowUpdatePassword(!showUpdatePassword)
		setOldPassword('')
		setNewPassword('')
		setShowDeleteAccount(false)
	}

	const handleDeleteAccount = () => {
		setShowDeleteAccount(!showDeleteAccount)
		setName('')
		setEmail('')
		setOldPassword('')
		setShowUpdatePassword(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		// Submit logic for updating password or deleting account
		// You can access the updated values from the respective state variables
	}

	return (
		<Flex flexDir={'column'} mt={2} p={4}>
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
			<Flex gap={5} mt={5}>
				{/* <Button
					//cursor={'pointer'} onClick={cursor={'pointer'} onClick}
					bg={base700}
					justifyContent={'space-between'}
					fontWeight={'400'}
					onClick={() => setUpdatePassword(true)}
				>
					update password
				</Button> */}
				<Button
					cursor={'pointer'}
					onClick={onOpenDelete}
					bg={redbg}
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
