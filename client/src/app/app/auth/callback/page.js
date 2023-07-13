'use client'

import { Flex, Heading, Spinner } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const Callback = () => {
	const searchParams = useSearchParams()
	const router = useRouter()

	const sessionToken = searchParams.get('sessionToken')

	useEffect(() => {
		localStorage.setItem('x-session-token', sessionToken)
		router.push('/dashboard')
	}, [])

	return (
		<Flex
			justifyContent={'center'}
			alignItems={'center'}
			gap={4}
			w={'100vw'}
			h={'100vh'}
		>
			<Spinner />
			<Heading fontSize={'md'}>
				Please wait. Authenticating you and redirecting....
			</Heading>
		</Flex>
	)
}

export default Callback
