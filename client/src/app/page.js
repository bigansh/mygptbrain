'use client'

import OnboardingComponent from '@/app/components/OnboardingModal'
import RightSidebar from '@/app/components/RightSidebar'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { useState } from 'react'
import ChatComponent from './components/ChatComponent'
import LeftSidebar from './components/LeftSidebar'
import { getUser } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { useUser } from './context/UserContext'

const HomePage = () => {
	const [platformModal, setPlatformModal] = useState(false)

	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const { user, setUser } = useUser()
	const { isLoading, isError, data, error } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
		onSuccess: (data) => {
			console.log(data, 1)
			setUser(data)
			if (Object.values(data.auth).some((v) => v === null)) {
				setPlatformModal(true)
			}
		},
	})

	return (
		<ProtectedRoute>
			<div className='flex w-full h-screen bg-white  text-black'>
				<OnboardingComponent
					isOpen={platformModal}
					setOpen={setPlatformModal}
				/>
				<div className='w-1/5'>
					<LeftSidebar />
				</div>
				<div className={`${isSidebarOpen ? 'w-3/5' : 'w-4/5'}`}>
					{/* <ChatComponent /> */}

					<button onClick={() => setPlatformModal(true)}>Test</button>
				</div>
				<div className={`${isSidebarOpen ? 'w-1/5' : ''}`}>
					<RightSidebar
						isSidebarOpen={isSidebarOpen}
						setIsSidebarOpen={setIsSidebarOpen}
						handleToggleSidebar={() =>
							setIsSidebarOpen(!isSidebarOpen)
						}
					/>
				</div>
			</div>
		</ProtectedRoute>
	)
}

export default HomePage
