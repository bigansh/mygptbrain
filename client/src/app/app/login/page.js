'use client'
import { authenticateUser, authenticateUserByGoogle, verifyEmail } from '@/api'
import { OnboardingBanner } from '@/assets'
import {
	Heading,
	Box,
	Divider,
	AbsoluteCenter,
	Input,
	Flex,
	FormLabel,
	Grid,
	Button,
	Text,
	useToast,
	Spinner,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'

const Login = () => {
	const [userDetails, setUserDetails] = useState({
		email: '',
		password: '',
	})
	const [loading, setLoading] = useState(false)

	const toast = useToast()
	const router = useRouter()

	const handleChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.id]: e.target.value,
		})
	}

	const [isEmailFocused, setIsEmailFocused] = useState(false)

	const handleEmailFocus = () => {
		setIsEmailFocused(true)
	}

	const handleLoginSubmit = async (e) => {
		setLoading(true)
		e.preventDefault()
		if (!verifyEmail(userDetails.email)) {
			setUserDetails({ email: '', password: '' })
			toast({
				title: 'Email not valid. Please use a valid email address',
				position: 'top',
				variant: 'left-accent',
				status: 'error',
				duration: 3000,
			})
			setLoading(false)
			return
		}

		try {
			const res = await authenticateUser({
				queryType: 'login',
				data: userDetails,
			})
			console.log(res)
			if (res.status == 200) {
				toast({
					title: 'Logged in successfully',
					position: 'top',
					variant: 'left-accent',
					status: 'success',
					duration: 3000,
				})
			}
			localStorage.setItem('x-session-token', res.data.sessionToken)
			router.push('/app/dashboard')
		} catch (error) {
			console.log(error)
			toast({
				title: 'Error while logging in',
				position: 'top',
				variant: 'left-accent',
				status: 'error',
				duration: 3000,
			})
			localStorage.removeItem('x-session-token')
		}
		setLoading(false)
	}

	return (
		<Grid
			w={'100vw'}
			h={'100vh'}
			bg='white'
			gridTemplateColumns={'1fr 2fr'}
		>
			<Flex flexDir={'column'} p={5} justifyContent={'center'} gap={2.5}>
				<FormLabel fontSize={'2xl'} fontWeight={'400'} mb={0} mt={2}>
					email
				</FormLabel>
				<Input
					id='email'
					type='email'
					value={userDetails.email}
					onChange={handleChange}
					onFocus={handleEmailFocus}
					placeholder='barundebnath91@gmail.com'
				/>
				{isEmailFocused ? (
					<Flex flexDir={'column'} gap={2.5}>
						<FormLabel fontSize={'2xl'} fontWeight={'400'} mb={0}>
							password
						</FormLabel>
						<Input
							id='password'
							type='password'
							value={userDetails.password}
							onChange={handleChange}
							placeholder='***'
						/>

						<Button
							title='login'
							fontWeight={'400'}
							bg={'#DFE8FF'}
							_hover={{
								bg: '#DFE8FF',
							}}
							color={'black'}
							cursor={'pointer'} onClick={handleLoginSubmit}
							mt={2}
						>
							{loading ? <Spinner /> : 'login'}
						</Button>

						<Text color='#E5A79F' fontSize='16px' ml={'auto'}>
							<Link href='/signup'>or sign up</Link>
						</Text>
					</Flex>
				) : (
					<>
						<Box position='relative' py='4' fontSize={'18px'}>
							<Divider
								bg={'black'}
								borderColor={'black'}
								rounded={'md'}
								borderWidth={'1px'}
							/>
							<AbsoluteCenter px='4' bg={'white'}>
								or
							</AbsoluteCenter>
						</Box>

						<Button
							bg='#CA504080'
							p={2.5}
							w={'100%'}
							color={'white'}
							gap={2.5}
							fontSize={'18px'}
							_hover={{ opacity: '80%' }}
							cursor={'pointer'} onClick={() => authenticateUserByGoogle()}
						>
							<div>Continue with Google</div>
							<FaGoogle />
						</Button>
					</>
				)}
			</Flex>
			<Flex flexDir={'column'} p={5} gap={5} justifyContent={'center'}>
				<Heading fontSize={'2xl'} fontWeight={'400'}>
					let your brain talk...
				</Heading>

				<Image
					src={OnboardingBanner}
					alt='Onboarding Banner'
					style={{ width: '100%' }}
				/>
			</Flex>
		</Grid>
	)
}

export default Login
