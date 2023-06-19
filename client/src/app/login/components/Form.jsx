'use client'

import { googleLogin } from '@/api/googleAuth'
import axios from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import GoogleLogo from '../assets/GoogleLogo'
import Button from './Button'
import Input from './Input'
import OrComponent from './OrComponent'

const LoginScreen = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPasswordInput, setShowPasswordInput] = useState(false)
	const [isEmailFocused, setIsEmailFocused] = useState(false)

	const dispatch = useDispatch()

	const handleGoogleLogin = () => {
		// Redirect the user to the Google login page with the callback URL
		window.location.href = `https://api-testing.mygptbrain.com/auth/initialize?query_type=google&authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXQiOiJNIyN3UGtxZTZZNXZaIzdLJCNCSFBjWG9MNHFzNWtWcDN3XnJrJllWUWhnU1FnS3QzS3YqdEhqJXUlWkhQQFc0In0.Q_uuXmA6FmZuRkYor47Ic3TPVXGzlMR6F4nQUlFfpjg`
		dispatch(googleLogin())
	}

	// const handleGoogleLogin = async () => {
	// 	try {
	// 		const response = await axios.get(
	// 			'https://api-testing.mygptbrain.com/auth/initialize?query_type=google&authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXQiOiJNIyN3UGtxZTZZNXZaIzdLJCNCSFBjWG9MNHFzNWtWcDN3XnJrJllWUWhnU1FnS3QzS3YqdEhqJXUlWkhQQFc0In0.Q_uuXmA6FmZuRkYor47Ic3TPVXGzlMR6F4nQUlFfpjg'
	// 			// ,
	// 			// {
	// 			// 	params: {
	// 			// 		query_type: 'google',
	// 			// 		authorization:
	// 			// 			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXQiOiJNIyN3UGtxZTZZNXZaIzdLJCNCSFBjWG9MNHFzNWtWcDN3XnJrJllWUWhnU1FnS3QzS3YqdEhqJXUlWkhQQFc0In0.Q_uuXmA6FmZuRkYor47Ic3TPVXGzlMR6F4nQUlFfpjg',
	// 			// 	},
	// 			// }
	// 		)

	// 		// Handle the response data here
	// 		console.log(response.data)
	// 	} catch (error) {
	// 		// Handle error if the request fails
	// 		console.error(error)
	// 	}
	// }

	const handleEmailChange = (e) => {
		setEmail(e.target.value)
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	const handleEmailFocus = () => {
		setIsEmailFocused(true)
	}

	const handleEmailBlur = () => {
		setIsEmailFocused(false)
	}

	const handleEmailSubmit = (e) => {
		e.preventDefault()
		setShowPasswordInput(true)
	}

	const handleLoginSubmit = (e) => {
		e.preventDefault()
		// Perform login logic using email and password
		// ...
	}

	return (
		<div className='flex flex-col justify-center px-4 h-screen w-full'>
			{!isEmailFocused && !email && (
				<form
					className='flex flex-col  gap-4  space-y-2'
					onSubmit={handleEmailSubmit}
				>
					<Input
						label='email'
						type='email'
						value={email}
						onChange={handleEmailChange}
						onFocus={handleEmailFocus}
						onBlur={handleEmailBlur}
						placeholder='barundebnath91@gmail.com'
					/>

					<>
						<OrComponent />
						<button
							className='bg-[#CA5040] bg-opacity-50 hover:bg-red-600  text-whitetext-xl w-full  lg:text-2xl  rounded px-4 py-2  focus:outline-none '
							onClick={handleGoogleLogin}
						>
							<div className='flex items-center justify-center space-x-4'>
								<div>continue with Google</div>

								<GoogleLogo />
							</div>
						</button>
					</>
				</form>
			)}

			{isEmailFocused && (
				<form
					className='flex flex-col  gap-4  space-y-2'
					onSubmit={handleEmailSubmit}
				>
					<Input
						label='email'
						type='email'
						value={email}
						onChange={handleEmailChange}
						onFocus={handleEmailFocus}
						onBlur={handleEmailBlur}
						placeholder='barundebnath91@gmail.com'
					/>

					<div className={``}>
						<Input
							label='password'
							type='password'
							value={password}
							onChange={handlePasswordChange}
							placeholder='***'
						/>
					</div>

					<Button
						title='login'
						classes='bg-[#DFE8FF] bg-opacity-50 hover:bg-[#DFE8FF]'
						// isEmailFocused={isEmailFocused}
					/>

					<p className='text-sm '>
						<Link
							href='/signup'
							className={`text-[#E5A79F] text-xl flex items-end justify-end `}
						>
							or sign up
						</Link>
					</p>
				</form>
			)}
		</div>
	)
}

export default LoginScreen
