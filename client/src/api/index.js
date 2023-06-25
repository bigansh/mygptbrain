// api/index.js
import axios from 'axios'

const apiClient = axios.create({
	baseURL: `https://api-testing.mygptbrain.com`,
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
})

apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('x-session-token')
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	(error) => Promise.reject(error)
)

/**
 ** Auth EndPoints
 **/

const authToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXQiOiJNIyN3UGtxZTZZNXZaIzdLJCNCSFBjWG9MNHFzNWtWcDN3XnJrJllWUWhnU1FnS3QzS3YqdEhqJXUlWkhQQFc0In0.Q_uuXmA6FmZuRkYor47Ic3TPVXGzlMR6F4nQUlFfpjg'

export const authenticateUserByGoogle = async () => {
	window.location.href = `https://api-testing.mygptbrain.com/auth/initialize?query_type=google&authorization=${authToken}`
}

export const authenticateUser = async ({ queryType, userData }) => {
	const response = await apiClient.post(
		`/auth/initialize?query_type=${queryType}&authorization=${authToken}`,
		userData
	)
	return response
}

export const connectPlatform = async ({ platform, profileId }) => {
	window.location.href = `https://api-testing.mygptbrain.com/auth/initialize?query_type=${platform}&authorization=${authToken}&profile_id=${profileId}`
}

/**
 ** User EndPoints
 **/

export const getUser = async () => {
	const response = await apiClient.get(`/user/read`)
	return response.data
}

export const updateUser = async (data) => {
	const response = await apiClient.patch(`/user/update`, data)
	return response
}

export const deleteUser = async () => {
	const response = await apiClient.delete(`/user/delete`)
	return response
}

/**
 ** Document EndPoints
 **/

export const uploadDoc = async () => {
	const response = await apiClient.get(`/document/create?query_type=upload`)
	return response.data
}
