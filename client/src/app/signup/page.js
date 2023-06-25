'use client'

import { OnboardingBanner } from '../assets'
import Image from 'next/image'
import React from 'react'
import SignupScreen from './components/Form'

const Signup = () => {
	return (
		<div className='flex items-center justify-center w-full bg-white'>
			<div className='w-full px-4 lg:w-1/3'>
				<SignupScreen />
			</div>
			<div className='w-2/3 h-screen relative hidden lg:flex'>
				<Image
					src={OnboardingBanner}
					alt='Onboarding Banner'
					fill={true}
				/>
			</div>
		</div>
	)
}

export default Signup
