import axios from 'axios'

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'

// Action Creators
export const loginSuccess = (token) => ({
	type: LOGIN_SUCCESS,
	payload: token,
})

export const logout = () => ({
	type: LOGOUT,
})

const api = axios.create({
	baseURL: 'https://api-testing.mygptbrain.com/auth', // Replace with your API endpoint
})

// Async Action for Google Login
export const googleLogin = () => async (dispatch) => {
	try {
		// Make a request to your backend API to initiate the Google login process
		const response = await api.get(
			`https://api-testing.mygptbrain.com/auth/initialize?query_type=google&authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXQiOiJNIyN3UGtxZTZZNXZaIzdLJCNCSFBjWG9MNHFzNWtWcDN3XnJrJllWUWhnU1FnS3QzS3YqdEhqJXUlWkhQQFc0In0.Q_uuXmA6FmZuRkYor47Ic3TPVXGzlMR6F4nQUlFfpjg`
		)
		// console.log(response)

		// Redirect the user to the Google login page
		window.location.href = '/api/auth/google/redirect'
		return response.data.token
	} catch (error) {
		console.error('Google login failed:', error)
	}
}

// Async Action for handling the JWT token received after authentication
export const handleSessionToken = () => async (dispatch) => {
	try {
		// Get the sessionToken from the query parameter
		const urlParams = new URLSearchParams(window.location.search)
		const sessionToken = urlParams.get('sessionToken')

		if (sessionToken) {
			// Store the JWT session token in local storage
			localStorage.setItem('sessionToken', sessionToken)

			// Store the JWT session token in Redux state
			dispatch(loginSuccess(sessionToken))
		}
	} catch (error) {
		console.error('Handling session token failed:', error)
	}
}
