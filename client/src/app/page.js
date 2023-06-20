'use client'

import { handleSessionToken } from '@/api/googleAuth'
import OnboardingComponent from '@/app/components/OnboardingModal'
import RightSidebar from '@/app/components/RightSidebar'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ChatComponent from './components/ChatComponent'
import LeftSidebar, { default as Sidebar } from './components/LeftSidebar'

const HomePage = () => {
	const dispatch = useDispatch()

	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const handleToggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

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
				<div className={`${isSidebarOpen ? 'w-1/2' : 'w-3/4'}`}>
					<ChatComponent />
				</div>
				<div className={`${isSidebarOpen ? 'w-1/4' : ''}`}>
					<RightSidebar
						isSidebarOpen={isSidebarOpen}
						setIsSidebarOpen={setIsSidebarOpen}
						handleToggleSidebar={handleToggleSidebar}
					/>
				</div>
			</div>
		</ProtectedRoute>
	)
}

export default HomePage
