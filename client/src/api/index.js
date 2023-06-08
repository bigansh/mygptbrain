// api/index.js
import axios from 'axios'

const api = axios.create({
	baseURL: 'https://api-testing.mygptbrain.com/auth', // Replace with your API endpoint
})

export default api

export const registerUserByGoogle = async () => {
	const response = await axios.get(
		`${BASE_URL}/initialize?query_type=google&authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXQiOiJNIyN3UGtxZTZZNXZaIzdLJCNCSFBjWG9MNHFzNWtWcDN3XnJrJllWUWhnU1FnS3QzS3YqdEhqJXUlWkhQQFc0In0.Q_uuXmA6FmZuRkYor47Ic3TPVXGzlMR6F4nQUlFfpjg`
	)
	console.log(response)
	return response.data.token
}

// Register a new user and receive JWT token
export const registerUser = async (userData, platform) => {
	const response = await axios.post(
		`${BASE_URL}/auth/query_type={platform}`,
		userData
	)
	console.log(response.data.token)
	return response.data.token
}

// Login a user and receive JWT token
export const loginUser = async (credentials) => {
	const response = await axios.post(`${BASE_URL}/login`, credentials)
	return response.data.token
}

// Verify JWT token and get user information
export const verifyToken = async (token) => {
	const response = await axios.post(`${BASE_URL}/verify`, { token })
	return response.data
}
