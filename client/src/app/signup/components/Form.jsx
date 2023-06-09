import Link from 'next/link'
import { useState } from 'react'
import Button from './Button'
import Input from './Input'

const SignupScreen = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleNameChange = (e) => {
		setName(e.target.value)
	}

	const handleEmailChange = (e) => {
		setEmail(e.target.value)
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	const handleSignupSubmit = (e) => {
		e.preventDefault()
		// Perform signup logic using name, email, and password
		// ...
	}

	return (
		<div className='flex flex-col w-full px-4 justify-center h-screen'>
			<form className='flex flex-col gap-4' onSubmit={handleSignupSubmit}>
				<div>
					<Input
						label='name'
						type='name'
						value={name}
						onChange={handleNameChange}
						placeholder='barun'
					/>
				</div>

				<div>
					<Input
						label='email'
						type='email'
						value={email}
						onChange={handleEmailChange}
						placeholder='barundebnath91@gmail.com'
					/>
				</div>

				<div>
					<Input
						label='password'
						type='password'
						value={password}
						onChange={handlePasswordChange}
						placeholder='***'
					/>
				</div>

				<Button
					title='signup'
					classes='bg-[#DFE8FF] bg-opacity-50 hover:bg-[#DFE8FF]'
					// isEmailFocused={isEmailFocused}
				/>
			</form>
		</div>
	)
}

export default SignupScreen
