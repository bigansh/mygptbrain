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
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
const Signup = () => {
	const router = useRouter()
	const toast = useToast()
	const { base, base800, base700, base600, text } = useColors()

	const [userDetails, setUserDetails] = useState({
		name: '',
		email: '',
		password: '',
	})

	const handleChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.id]: e.target.value,
		})
	}

	const [isEmailFocused, setIsEmailFocused] = useState(false)

	const handleLoginSubmit = async (e) => {
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
			return
		}
		try {
			const res = await authenticateUser({
				queryType: 'signup',
				data: userDetails,
			})
			if (res.status == 200) {
				toast({
					title: 'Signed up successfully',
					position: 'top',
					variant: 'solid',
					status: 'success',
					duration: 3000,
				})
			}
			// TODO : err 500 user already there
			localStorage.setItem('x-session-token', res.data.sessionToken)
			document.cookie = `x-session-token=${res.data.sessionToken};${
				process.env.NEXT_PUBLIC_PRODUCTION &&
				`domain=.${process.env.NEXT_PUBLIC_PRODUCTION_URL};`
			} expires=Fri, 31 Dec 9999 21:10:10 GMT`
			router.push('/app/dashboard')
		} catch (error) {
			toast({
				title: 'Error while signing up',
				position: 'top',
				variant: 'solid',
				status: 'error',
				duration: 3000,
			})
			console.log(error)
			removeTokens()
			logtail.info('Error signing up', error)
			logtail.flush()
		}
	}

	return (
		<Grid
			display={['flex', 'grid']}
			flexDir={['column-reverse', 'row']}
			justifyContent={'center'}
			w={'100vw'}
			h={'100vh'}
			background={base}
			gridTemplateColumns={'1fr 2fr'}
		>
			<Flex flexDir={'column'} p={5} justifyContent={'center'} gap={2.5}>
				<FormLabel fontSize={'2xl'} fontWeight={'400'} mb={0} mt={2}>
					name
				</FormLabel>
				<Input
					id='name'
					type='name'
					value={userDetails.name}
					onChange={handleChange}
					placeholder='Jarvis'
				/>
				<FormLabel fontSize={'2xl'} fontWeight={'400'} mb={0} mt={2}>
					email
				</FormLabel>
				<Input
					id='email'
					type='email'
					value={userDetails.email}
					onChange={handleChange}
					onFocus={(e) => setIsEmailFocused(true)}
					placeholder='brain@human.com'
				/>
				{isEmailFocused || userDetails.email !== '' ? (
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
							value={userDetails.password}
							onChange={handleChange}
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
							signup
						</Button>
						<Text color='#E5A79F' fontSize='16px' ml={'auto'}>
							<Link href='/onboarding/login'>or login</Link>
						</Text>
					</>
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

export default Signup
