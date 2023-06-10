'use client'

import { handleSessionToken } from '@/api/googleAuth'
import OnboardingComponent from '@/app/components/OnboardingModal'
import RightSidebar from '@/app/components/RightSidebar'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ChatComponent from './components/ChatComponent'
import LeftSidebar, { default as Sidebar } from './components/LeftSidebar'

const HomePage = () => {
	const dispatch = useDispatch()

	// useEffect(() => {
	// 	dispatch(handleSessionToken())
	// }, [dispatch])

	return (
		<ProtectedRoute>
			<div className='flex w-full h-screen bg-white  text-black'>
				{/* <OnboardingComponent /> */}
				<div className='w-1/4'>
					<LeftSidebar />
				</div>
				<div className='w-3/4'>
					<ChatComponent />
				</div>
				{/* <div className='w-1/4'>
					<RightSidebar />
				</div> */}
			</div>
		</ProtectedRoute>
	)
}

export default HomePage
