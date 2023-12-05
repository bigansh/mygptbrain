// api/index.js
import axios from 'axios'

export const runtime = 'edge'

const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
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

const personaApiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
})

personaApiClient.interceptors.request.use(
	(config) => {
		config.headers[
			'Authorization'
		] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXQiOiJNIyN3UGtxZTZZNXZaIzdLJCNCSFBjWG9MNHFzNWtWcDN3XnJrJllWUWhnU1FnS3QzS3YqdEhqJXUlWkhQQFc0In0.Q_uuXmA6FmZuRkYor47Ic3TPVXGzlMR6F4nQUlFfpjg`
		return config
	},
	(error) => Promise.reject(error)
)

/**
 ** Auth EndPoints
 **/

const authToken = process.env.NEXT_PUBLIC_API_AUTH_TOKEN

export const authenticateUserByGoogle = async () => {
	window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/initialize?query_type=google&authorization=${authToken}`
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
	window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/initialize?query_type=${platform}&authorization=${authToken}&profile_id=${profileId}`
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

export const updatePassword = async (data) => {
	const response = await apiClient.patch(`/auth/update`, data)
	return response.data
}

export const deleteUser = async (id) => {
	const response = await apiClient.delete(`/user/delete`, {
		chatQueryObject: { chat_id: id },
	})
	return response.data
}

/**
 ** Document EndPoints
 **/

export const getDoc = async (data) => {
	const response = await apiClient.post(`/document/read`, {
		documentQueryObject: data,
		selectObject: {
			document_id: true,
			profile_id: true,
			body: data?.document_id !== undefined ? true : false,
			heading: true,
			createdAt: true,
			updatedAt: true,
			documentMetadata: true,
		},
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

export const deleteDoc = async ({ document_id, profile_id }) => {
	const response = await apiClient.patch(`/document/delete`, {
		documentQueryObject: {
			profile_id,
			document_id,
		},
	})
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

export const createDocumentChat = async (data) => {
	const response = await apiClient.post(`/chat/create`, {
		chatQueryObject: data,
	})
	return response.data
}

export const updatePromptTemplate = async (data) => {
	const response = await apiClient.patch('/user/update?query_type=metadata', {
		userMetadataObject: data,
	})
	return response.data
}

export const readChat = async (data) => {
	//{ prompt?, chat_name?, chat_id?, profile_id }

	const response = await apiClient.post(`/chat/read`, {
		chatQueryObject: data,
		selectObject: {
			chat_id: true,
			chat_name: true,
			profile_id: true,
			chat_array:
				data?.chat_id !== undefined ||
				data?.preferences?.document_id !== undefined
					? true
					: false,
			source_documents: true,
			chat_history:
				data?.chat_id !== undefined ||
				data?.preferences?.document_id !== undefined
					? true
					: false,
			createdAt: true,
			updatedAt: true,
			preferences: true,
		},
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

export const deleteChat = async ({ chat_id, profile_id }) => {
	const response = await apiClient.patch(`/chat/delete`, {
		chatQueryObject: {
			chat_id,
			profile_id,
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

export const updatePersona = async (data) => {
	// { prompt, chat_id }
	const response = await personaApiClient.post(`/persona/chat`, {
		chatQueryObject: data,
	})

	return response.data
}
