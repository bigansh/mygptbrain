import Link from 'next/link'
import { use, useState } from 'react'
import Button from './Button'
import Input from './Input'
import { authenticateUser } from '@/api'
const SignupScreen = () => {
	const [userDetails, setUserDetails] = useState({
		name: '',
		email: '',
		password: '',
	})

	// const mutation = useMutation({
	// 	mutationFn: authenticateUser,
	// 	onSuccess: () => {
	// 		// Invalidate and refetch
	// 		// queryClient.invalidateQueries({ queryKey: ['todos'] })
	// 	},
	// })

	const handleChange = (e) => {
		console.log(userDetails, e.target.type)
		setUserDetails({
			...userDetails,
			[e.target.id]: e.target.value,
		})
	}

	const handleSignupSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await authenticateUser({
				queryType: 'signup',
				userData: {
					userObject: {
						personalDetails: {
							email: userDetails.email,
							name: userDetails.name,
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
		<div className='flex flex-col w-full px-4 justify-center h-screen'>
			<form className='flex flex-col gap-4' onSubmit={handleSignupSubmit}>
				<div>
					<Input
						label='name'
						type='name'
						value={userDetails.name}
						onChange={handleChange}
						placeholder='barun'
					/>
				</div>

				<div>
					<Input
						label='email'
						type='email'
						value={userDetails.email}
						onChange={handleChange}
						placeholder='barundebnath91@gmail.com'
					/>
				</div>

				<div>
					<Input
						label='password'
						type='password'
						value={userDetails.password}
						onChange={handleChange}
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
