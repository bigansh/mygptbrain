'use client'

import axios from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import GoogleLogo from '../assets/GoogleLogo'
import Button from './Button'
import Input from './Input'
import OrComponent from './OrComponent'
import { authenticateUser, authenticateUserByGoogle } from '@/api'

const LoginScreen = () => {
	const [userDetails, setUserDetails] = useState({
		email: '',
		password: '',
	})

	const handleChange = (e) => {
		console.log(userDetails, e.target.type)
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
		e.preventDefault()
		try {
			const res = await authenticateUser({
				queryType: 'login',
				userData: {
					userObject: {
						personalDetails: {
							email: userDetails.email,
						},
						authDetails: {
							password: userDetails.password,
						},
					},
				},
			})
			// TODO : err 500 user already there
			localStorage.setItem('x-session-token', res.data.sessionToken)
			console.log(res.data.sessionToken, 'signp')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='flex flex-col justify-center px-4 h-screen w-full'>
			<form
				className='flex flex-col  gap-4  space-y-2'
				onSubmit={handleLoginSubmit}
			>
				<Input
					label='email'
					type='email'
					value={userDetails.email}
					onChange={handleChange}
					onFocus={handleEmailFocus}
					placeholder='barundebnath91@gmail.com'
				/>

				{isEmailFocused ? (
					<>
						<Input
							label='password'
							type='password'
							value={userDetails.password}
							onChange={handleChange}
							placeholder='***'
						/>

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
					</>
				) : (
					<>
						<OrComponent />
						<button
							className='bg-[#CA5040] bg-opacity-50 hover:bg-red-600  text-whitetext-xl w-full  lg:text-xl  rounded px-4 py-2  focus:outline-none '
							onClick={authenticateUserByGoogle()}
						>
							<div className='flex items-center justify-center p-2 gap-2'>
								<div>Continue with Google</div>

								<GoogleLogo />
							</div>
						</button>
					</>
				)}
			</form>
		</div>
	)
}

export default LoginScreen
