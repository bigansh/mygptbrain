'use client'

import { OnboardingBanner } from '@/assets'
import Image from 'next/image'
import React from 'react'
import LoginScreen from './Form'

const Login = () => {
	return (
		<div className='flex items-center justify-center w-full bg-white'>
			<div className='w-1/3'>
				<LoginScreen />
			</div>
			<div className='w-2/3 h-screen relative'>
				<Image
					src={OnboardingBanner}
					alt='Onboarding Banner'
					fill={true}
				/>
			</div>
		</div>
	)
}

export default Login
