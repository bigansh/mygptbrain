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
	Img,
	Spinner,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const Auth = () => {
	const router = useRouter()
	const toast = useToast()
	const searchParams = useSearchParams()
	const redirectUrl = searchParams.get('redirect')

	const { base, base700, base600, text } = useColors()
	const [signupLoading, setSignupLoading] = useState(false)
	const [signupUserDetails, setSignupUserDetails] = useState({
		name: '',
		email: '',
		password: '',
	})

	const [currentView, setCurrentView] = useState('login')

	const handleSignupChange = (e) => {
		setSignupUserDetails({
			...signupUserDetails,
			[e.target.id]: e.target.value,
		})
	}

	const handleSignupSubmit = async (e) => {
		setSignupLoading(true)
		e.preventDefault()
		if (!verifyEmail(signupUserDetails.email)) {
			setSignupUserDetails({ email: '', password: '' })
			toast({
				title: 'please enter a valid email',
				position: 'top',
				variant: 'subtle',
				status: 'error',
				duration: 3000,
			})
			return
		}
		try {
			const res = await authenticateUser({
				queryType: 'signup',
				data: signupUserDetails,
			})
			if (res.status == 200) {
				toast({
					title: 'signup successful',
					position: 'top',
					variant: 'subtle',
					status: 'success',
					duration: 3000,
				})
			}
			// TODO : err 500 user already there
			localStorage.setItem('x-session-token', res.data.sessionToken)
			document.cookie = `x-session-token=${res.data.sessionToken}; path=/; domain=.mygptbrain.com; expires=Fri, 31 Dec 9999 21:10:10 GMT`
			setSignupLoading(false)
			if (redirectUrl && typeof redirectUrl === 'string') {
				toast({
					title: 'user logged in',
					description: 'Redirecting to the page you were on...',
					position: 'top',
					variant: 'subtle',
					status: 'error',
					duration: 3000,
				})
				router.push(decodeURIComponent(redirectUrl))
			} else {
				setSignupLoading(false)
				router.push('/app')
			}
		} catch (error) {
			setSignupLoading(false)
			toast({
				title: 'error signing up',
				position: 'top',
				variant: 'subtle',
				status: 'error',
				duration: 3000,
			})
			console.log(error)
			removeTokens()
			logtail.info('Error signing up', error)
			logtail.flush()
		}
		setSignupLoading(false)
	}

	const [userLoginDetails, setUserLoginDetails] = useState({
		email: '',
		password: '',
	})
	const [loginLoading, setLoginLoading] = useState(false)

	const handleLoginChange = (e) => {
		setUserLoginDetails({
			...userLoginDetails,
			[e.target.id]: e.target.value,
		})
	}

	const [isEmailFocused, setIsEmailFocused] = useState(false)

	const handleEmailFocus = () => {
		setIsEmailFocused(true)
	}

	const handleLoginSubmit = async (e) => {
		setLoginLoading(true)
		e.preventDefault()
		if (!verifyEmail(userLoginDetails.email)) {
			setUserLoginDetails({ email: '', password: '' })
			toast({
				title: 'please enter a valid email',
				position: 'top',
				variant: 'subtle',
				status: 'error',
				duration: 3000,
			})
			setLoginLoading(false)
			return
		}

		try {
			const res = await authenticateUser({
				queryType: 'login',
				data: userLoginDetails,
			})
			if (res.status == 200) {
				toast({
					title: 'used logged in',
					position: 'top',
					variant: 'subtle',
					status: 'success',
					duration: 3000,
				})
			}
			localStorage.setItem('x-session-token', res.data.sessionToken)
			console.log('here')
			console.log(
				'sessionToken',
				res.data.sessionToken,
				process.env.NEXT_PUBLIC_PRODUCTION
			)
			document.cookie = `x-session-token=${res.data.sessionToken}; path=/; domain=.mygptbrain.com; expires=Fri, 31 Dec 9999 21:10:10 GMT`

			if (redirectUrl && typeof redirectUrl === 'string') {
				toast({
					title: 'used logged in',
					description: 'Redirecting to the page you were on...',
					position: 'top',
					variant: 'subtle',
					status: 'error',
					duration: 3000,
				})
				router.push(decodeURIComponent(redirectUrl))
			} else {
				router.push('/app')
			}
		} catch (error) {
			toast({
				title: 'error logging in',
				position: 'top',
				variant: 'subtle',
				status: 'error',
				duration: 3000,
			})
			removeTokens()
			logtail.info('Error logging in', error)
			logtail.flush()
		}
		setLoginLoading(false)
	}

	return (
		<Grid
			display={['flex', 'grid']}
			flexDir={['column-reverse', 'row']}
			justifyContent={'center'}
			w={'100vw'}
			minH={'100vh'}
			h={['100%', '100vh']}
			background={base}
			gridTemplateColumns={'1fr 2fr'}
		>
			{currentView == 'signup' && (
				<Flex
					flexDir={'column'}
					p={5}
					justifyContent={'center'}
					gap={2.5}
				>
					<FormLabel
						fontSize={'2xl'}
						fontWeight={'400'}
						mb={0}
						mt={2}
					>
						name
					</FormLabel>
					<Input
						id='name'
						type='name'
						value={signupUserDetails.name}
						onChange={handleSignupChange}
						placeholder='Jarvis'
					/>
					<FormLabel
						fontSize={'2xl'}
						fontWeight={'400'}
						mb={0}
						mt={2}
					>
						email
					</FormLabel>
					<Input
						id='email'
						type='email'
						value={signupUserDetails.email}
						onChange={handleSignupChange}
						placeholder='brain@human.com'
					/>

					<>
						<FormLabel
							fontSize={'2xl'}
							fontWeight={'400'}
							mb={0}
							mt={2}
						>
							password
						</FormLabel>
						<Input
							id='password'
							type='password'
							value={signupUserDetails.password}
							onChange={handleSignupChange}
							placeholder='********'
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
							onClick={handleSignupSubmit}
							mt={2}
						>
							{signupLoading ? <Spinner /> : 'signup'}
						</Button>
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
						<Text
							color='#E5A79F'
							fontSize='16px'
							ml={'auto'}
							onClick={() => setCurrentView('login')}
						>
							or login
						</Text>
					</>
				</Flex>
			)}

			{currentView == 'login' && (
				<Flex
					flexDir={'column'}
					p={5}
					justifyContent={'center'}
					gap={2.5}
				>
					<FormLabel
						fontSize={'2xl'}
						fontWeight={'400'}
						mb={0}
						mt={2}
					>
						email
					</FormLabel>
					<Input
						id='email'
						type='email'
						value={userLoginDetails.email}
						onChange={handleLoginChange}
						onFocus={handleEmailFocus}
						placeholder='brain@human.com'
					/>
					{isEmailFocused ? (
						<Flex flexDir={'column'} gap={2.5}>
							<FormLabel
								fontSize={'2xl'}
								fontWeight={'400'}
								mb={0}
							>
								password
							</FormLabel>
							<Input
								id='password'
								type='password'
								value={userLoginDetails.password}
								onChange={handleLoginChange}
								placeholder='********'
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
								{loginLoading ? <Spinner /> : 'login'}
							</Button>
						</Flex>
					) : (
						<></>
					)}
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
					<Text
						color='#E5A79F'
						fontSize='16px'
						ml={'auto'}
						onClick={() => setCurrentView('signup')}
					>
						or sign up
					</Text>
				</Flex>
			)}

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

export default Auth
