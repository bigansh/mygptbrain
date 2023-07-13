// api/index.js
import axios from 'axios'

export const runtime = 'edge'

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
	console.log(
		`https://api-testing.mygptbrain.com/auth/initialize?query_type=google&authorization=${authToken}`
	)
	window.location.href = `https://api-testing.mygptbrain.com/auth/initialize?query_type=google&authorization=${authToken}`
}

export const authenticateUser = async ({ queryType, data }) => {
	const response = await apiClient.post(
		`/auth/initialize?query_type=${queryType}&authorization=${authToken}`,

		{
			userObject: {
				personalDetails: {
					email: data.email,
					name: data?.name,
				},
				authDetails: {
					password: data.password,
				},
			},
		}
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
	return response.data
}

export const deleteUser = async () => {
	const response = await apiClient.delete(`/user/delete`)
	return response.data
}

/**
 ** Document EndPoints
 **/

export const getDoc = async (data) => {
	const response = await apiClient.post(`/document/read`, {
		documentQueryObject: data,
	})
	return response.data
}

export const uploadDoc = async (url) => {
	const formData = new FormData()
	formData.append('data', url)
	const response = await apiClient.postForm(
		`/document/create?query_type=upload`,
		formData,
		{
			'Content-Type': 'multipart/form-data',
		}
	)
	return response.data
}

export const syncDoc = async () => {
	const response = await apiClient.post(`/document/create?query_type=sync`)
	return response.data
}

export const scrapeLink = async (url) => {
	const response = await apiClient.post(
		`/document/create?query_type=scrape`,
		{
			documentQueryObject: {
				documentMetadata: {
					url,
				},
			},
		}
	)
	return response.data
}

/**
 ** Chat EndPoints
 **/

export const createChat = async (prompt) => {
	const response = await apiClient.post(`/chat/create`, {
		chatQueryObject: {
			prompt,
		},
	})
	return response.data
}

export const readChat = async (data) => {
	//{ prompt?, chat_name?, chat_id?, profile_id }

	const response = await apiClient.post(`/chat/read`, {
		chatQueryObject: data,
	})

	return response.data
}

export const updateChatPreferences = async (data) => {
	// { data_sources?[] , llm_model? }

	const response = await apiClient.patch(
		`/chat/update?query_type=preferences`,
		{
			chatPreferencesObject: data,
		}
	)

	return response.data
}

export const updateChat = async (data) => {
	// { prompt, chat_id }
	const response = await apiClient.patch(`/chat/update?query_type=chat`, {
		chatQueryObject: data,
	})

	return response.data
}

export const deleteChat = async (id) => {
	const response = await apiClient.delete(`/chat/delete`, {
		chatQueryObject: {
			chat_id: id,
		},
	})
	return response.data
}

export const verifyEmail = async (email) => {
	const res = await axios.get(
		`https://disposable.debounce.io/?email=${email}`
	)
	return res.data.disposable
}
