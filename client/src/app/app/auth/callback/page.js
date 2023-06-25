'use client'

import Loader from '@/app/components/Loader'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const Callback = () => {
	const searchParams = useSearchParams()
	const router = useRouter()

	const sessionToken = searchParams.get('sessionToken')

	useEffect(() => {
		localStorage.setItem('x-session-token', sessionToken)
		router.push('/')
	}, [])

	return (
		<div className='flex items-center flex-col gap-4 justify-center w-full h-screen bg-white'>
			<Loader />
			<h1 className='text-black'>
				Please wait. Authenticating you and redirecting....
			</h1>
		</div>
	)
}

export default Callback
