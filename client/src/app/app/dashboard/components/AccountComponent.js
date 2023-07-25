'use client'
import { deleteUser, getUser } from '@/api'
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
	const { base, base800, base700, text , redbg } = useColors()
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
				onCloseOnboarding()
				toast({
					title: 'Account deleted successfully!',
					position: 'top',
					variant: 'left-accent',
					status: 'success',
					duration: 3000,
				})
				localStorage.removeItem('x-session-token')
				localStorage.removeItem('modal-display')
				router.push('/')
			},
			onError: (error) => {
				console.log(error)
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
				onChange={(e) =>
					setUserDetails({
						...userDetails,
						name: e.target.value,
					})
				}
				fontSize={'18px'}
				bg={base800}
				p={2.5}
				w={'400px'}
			/>
			<FormLabel fontSize={'xl'} fontWeight={'400'} mb={0} mt={4}>
				email
			</FormLabel>
			<Input
				id='email'
				type='email'
				value={userDetails.email}
				onChange={(e) =>
					setUserDetails({
						...userDetails,
						email: e.target.value,
					})
				}
				fontSize={'18px'}
				bg={base800}
				p={2.5}
				w={'400px'}
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
						w={'400px'}
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
						w={'400px'}
					/>
				</>
			)}
			<Flex gap={5} mt={5}>
				<Button
					//cursor={'pointer'} onClick={cursor={'pointer'} onClick}
					bg={base700}
					justifyContent={'space-between'}
					fontWeight={'400'}
					onClick={() => setUpdatePassword(true)}
				>
					update password
				</Button>
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
		// <div className='max-w-sm mt-8 p-4'>
		// 	<form onSubmit={handleSubmit}>
		// 		<div className='mb-4 flex flex-col items-start'>
		// 			<label
		// 				htmlFor='name'
		// 				className='block text-3xl text-black mb-1'
		// 			>
		// 				name
		// 			</label>
		// 			<input
		// 				type='text'
		// 				id='name'
		// 				className='w-full border border-gray-300 rounded-md py-2 px-3 bg-[#DFE8FF80] text-2xl'
		// 				value={userDetails.name}
		// 				onChange={(e) =>
		// 					setUserDetails({
		// 						...userDetails,
		// 						name: e.target.value,
		// 					})
		// 				}
		// 			/>
		// 		</div>

		// 		<div className='mb-4 flex flex-col items-start'>
		// 			<label
		// 				htmlFor='email'
		// 				className='block text-3xl text-black mb-1'
		// 			>
		// 				email
		// 			</label>
		// 			<input
		// 				type='email'
		// 				id='email'
		// 				className='w-full border border-gray-300 rounded-md py-2 px-3 bg-[#DFE8FF80] text-2xl'
		// 				value={userDetails.email}
		// 				onChange={(e) =>
		// 					setUserDetails({
		// 						...userDetails,
		// 						email: e.target.value,
		// 					})
		// 				}
		// 			/>
		// 		</div>

		// 		{showUpdatePassword && (
		// 			<>
		// 				<div className='mb-4 flex flex-col items-start'>
		// 					<label
		// 						htmlFor='oldPassword'
		// 						className='block text-2xl  text-gray-700 mb-1'
		// 					>
		// 						Old Password
		// 					</label>
		// 					<input
		// 						type='password'
		// 						id='oldPassword'
		// 						className='w-full border border-gray-300 rounded-md py-2 px-3 bg-[#DFE8FF80] text-2xl'
		// 						value={userDetails.oldPassword}
		// 						onChange={(e) =>
		// 							setUserDetails({
		// 								...userDetails,
		// 								oldPassword: e.target.value,
		// 							})
		// 						}
		// 					/>
		// 				</div>

		// 				<div className='mb-4'>
		// 					<label
		// 						htmlFor='newPassword'
		// 						className='block text-sm font-medium text-gray-700 mb-1'
		// 					>
		// 						New Password
		// 					</label>
		// 					<input
		// 						type='password'
		// 						id='newPassword'
		// 						className='w-full border border-gray-300 rounded-md py-2 px-3'
		// 						value={userDetails.newPassword}
		// 						onChange={setUserDetails({
		// 							...userDetails,
		// 							newPassword: e.target.value,
		// 						})}
		// 					/>
		// 				</div>
		// 			</>
		// 		)}

		// 		{showDeleteAccount && (
		// 			<>
		// 				<div className='mb-4'>
		// 					<label
		// 						htmlFor='password'
		// 						className='block text-sm font-medium text-gray-700 mb-1'
		// 					>
		// 						Password
		// 					</label>
		// 					<input
		// 						type='password'
		// 						id='password'
		// 						className='w-full border border-gray-300 rounded-md py-2 px-3'
		// 						value={oldPassword}
		// 						onChange={(e) => setOldPassword(e.target.value)}
		// 					/>
		// 				</div>
		// 			</>
		// 		)}

		// 		<div className='flex'>
		// 			{!showUpdatePassword && !showDeleteAccount && (
		// 				<button
		// 					type='button'
		// 					className='mr-2 px-2 py-2 bg-[#DFE8FF80] bg-opacity-50 text-black rounded-lg focus:outline-none text-lg w-full'
		// 					cursor={'pointer'} onClick={handleUpdatePassword}
		// 				>
		// 					Update Password
		// 				</button>
		// 			)}

		// 			{!showUpdatePassword && !showDeleteAccount && (
		// 				<button
		// 					type='button'
		// 					className='mr-2 px-2 py-2 bg-[#FFDFDF80] bg-opacity-50 text-black rounded-lg focus:outline-none text-lg w-full'
		// 					cursor={'pointer'} onClick={handleDeleteAccount}
		// 				>
		// 					Delete Account
		// 				</button>
		// 			)}

		// 			{showUpdatePassword && !showDeleteAccount && (
		// 				<button
		// 					type='button'
		// 					className='mr-2 px-2 py-2 bg-[#DFE8FF80] bg-opacity-50 text-black rounded-lg focus:outline-none text-lg w-full'
		// 					cursor={'pointer'} onClick={handleDeleteAccount}
		// 				>
		// 					confirm password
		// 				</button>
		// 			)}

		// 			{!showUpdatePassword && showDeleteAccount && (
		// 				<button
		// 					type='button'
		// 					className='mr-2 px-2 py-2 bg-[#FFDFDF80] bg-opacity-50 text-black rounded-lg focus:outline-none text-lg w-full'
		// 					cursor={'pointer'} onClick={handleDeleteAccount}
		// 				>
		// 					Delete Account
		// 				</button>
		// 			)}
		// 		</div>
		// 	</form>
		// </div>
	)
}

export default AccountComponent
