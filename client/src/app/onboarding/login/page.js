'use client'
import { authenticateUser, authenticateUserByGoogle, verifyEmail } from '@/api'
import { logtail } from '@/app/providers'
import { OnboardingBanner } from '@/assets'
import { useColors } from '@/utils/colors'
import { removeTokens } from '@/utils/helpers'
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
	Img,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'

const Login = () => {
	const { base, base800, base700, text, base600 } = useColors()

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
				variant: 'solid',
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
			if (res.status == 200) {
				toast({
					title: 'Logged in successfully',
					position: 'top',
					variant: 'solid',
					status: 'success',
					duration: 3000,
				})
			}
			localStorage.setItem('x-session-token', res.data.sessionToken)
			document.cookie = `x-session-token=${res.data.sessionToken};${
				process.env.NEXT_PUBLIC_PRODUCTION &&
				`domain=.mygptbrain.com;`
			} expires=Fri, 31 Dec 9999 21:10:10 GMT`
			router.push('/app/dashboard')
		} catch (error) {
			toast({
				title: 'Error while logging in',
				position: 'top',
				variant: 'solid',
				status: 'error',
				duration: 3000,
			})
			removeTokens()
			logtail.info('Error logging in', error)
			logtail.flush()
		}
		setLoading(false)
	}

	return (
		<Grid
			display={['flex', 'grid']}
			flexDir={['column-reverse', 'row']}
			justifyContent={'center'}
			w={'100vw'}
			h={'100vh'}
			bg='white'
			gridTemplateColumns={'1fr 2fr'}
			background={base}
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
					placeholder='brain@human.com'
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
							bg={base700}
							_hover={{
								bg: base600,
							}}
							color={text}
							cursor={'pointer'}
							onClick={handleLoginSubmit}
							mt={2}
						>
							{loading ? <Spinner /> : 'login'}
						</Button>

						<Text color='#E5A79F' fontSize='16px' ml={'auto'}>
							<Link href='/onboarding/signup'>or sign up</Link>
						</Text>
					</Flex>
				) : (
					<>
						<Box position='relative' py='4' fontSize={'18px'}>
							<Divider
								bg={text}
								borderColor={text}
								rounded={'md'}
								borderWidth={'1px'}
							/>
							<AbsoluteCenter px='4' bg={base}>
								or
							</AbsoluteCenter>
						</Box>

						<Button
							fontWeight={'400'}
							bg={base}
							mt={2}
							px={4}
							py={2}
							border={'1px solid #e0e0e0'}
							gap={2}
							rounded={'lg'}
							color={text}
							cursor={'pointer'}
							onClick={() => authenticateUserByGoogle()}
						>
							<Img
								w={6}
								h={6}
								src='https://www.svgrepo.com/show/475656/google-color.svg'
								loading='lazy'
								alt='google logo'
							/>
							<span>Continue with Google</span>
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
