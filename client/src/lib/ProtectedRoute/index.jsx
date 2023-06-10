'use client'

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/reducers/authSlice'

const ProtectedRoute = ({ children }) => {
	const router = useRouter()
	const user = useSelector(selectUser)

	// Redirect to login if user is not authenticated
	// if (!user) {
	// 	router.push('/login')
	// 	return null
	// }

	// Render the protected route component
	return <>{children}</>
}

export default ProtectedRoute
