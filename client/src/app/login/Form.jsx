'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { googleLogin } from '@/api/googleAuth'

const LoginScreen = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPasswordInput, setShowPasswordInput] = useState(false)
	const [isEmailFocused, setIsEmailFocused] = useState(false)

	const dispatch = useDispatch()

	const handleGoogleLogin = () => {
		dispatch(googleLogin())
	}

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
		<div className='flex flex-col items-center justify-center h-screen '>
			{!showPasswordInput ? (
				<form
					className='flex flex-col gap-4'
					onSubmit={handleEmailSubmit}
				>
					<div>
						<label
							htmlFor='name'
							className='block text-3xl text-black mb-1'
						>
							email
						</label>
						<input
							type='email'
							value={email}
							onChange={handleEmailChange}
							onFocus={handleEmailFocus}
							onBlur={handleEmailBlur}
							placeholder='barundebnath91@gmail.com'
							className='w-full border border-gray-300 rounded-md py-2 px-3 bg-[#DFE8FF] bg-opacity-50 text-2xl'
						/>
					</div>
					<div className={` ${isEmailFocused ? '' : 'hidden'}`}>
						<label
							htmlFor='name'
							className='block text-3xl text-black mb-1'
						>
							password
						</label>
						<input
							type='password'
							value={email}
							onChange={handleEmailChange}
							onFocus={handleEmailFocus}
							onBlur={handleEmailBlur}
							placeholder='***'
							className='w-full border border-gray-300 rounded-md py-2 px-3 bg-[#DFE8FF] bg-opacity-50 text-2xl'
						/>
					</div>

					<button
						type='submit'
						className={`bg-[#DFE8FF] bg-opacity-50 text-black text-xl rounded px-4 py-2 focus:outline-none ${
							isEmailFocused ? '' : 'hidden'
						}`}
					>
						login
					</button>
					<p className='text-sm '>
						<Link
							href='/signup'
							className={`text-[#E5A79F] text-xl flex items-end justify-end ${
								isEmailFocused ? '' : 'hidden'
							}`}
						>
							or sign up
						</Link>
					</p>

					{!isEmailFocused && (
						<>
							<div className='flex items-center justify-center space-x-4'>
								<div className='border-t-2 w-40 border-black' />
								<div>or</div>
								<div className='border-t-2 w-40 border-black' />
							</div>
							<button
								className='bg-[#CA5040] bg-opacity-50 hover:bg-red-600 text-white rounded px-4 py-2 focus:outline-none text-2xl'
								onClick={handleGoogleLogin}
							>
								continue with Google
							</button>
						</>
					)}
				</form>
			) : (
				<form
					className='flex flex-col gap-4'
					onSubmit={handleLoginSubmit}
				>
					<input
						type='email'
						value={email}
						disabled
						className='border border-gray-300 rounded px-4 py-2 focus:outline-none'
					/>
					<input
						type='password'
						value={password}
						onChange={handlePasswordChange}
						placeholder='Enter your password'
						className='border border-gray-300 rounded px-4 py-2 focus:outline-none'
					/>
					<button
						type='submit'
						className='bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 focus:outline-none'
					>
						Login
					</button>
				</form>
			)}
		</div>
	)
}

export default LoginScreen
