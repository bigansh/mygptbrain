import { createSlice } from '@reduxjs/toolkit'
import api from '../../api'

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		error: null,
		isLoading: false,
		token: localStorage.getItem('token') || null,
	},
	reducers: {
		loginUserStart: (state) => {
			state.isLoading = true
			state.error = null
		},
		loginUserSuccess: (state, action) => {
			state.isLoading = false
			state.token = action.payload.token
			state.user = action.payload.user
			localStorage.setItem('token', action.payload.token)
		},
		loginUserFailure: (state, action) => {
			state.error = action.payload
			state.isLoading = false
		},
		setUser: (state, action) => {
			state.user = action.payload
		},
		clearUser: (state) => {
			state.user = null
		},
		logout(state) {
			state.token = null
			state.user = null
			localStorage.removeItem('token')
		},
	},
})

export const {
	loginUserStart,
	loginUserSuccess,
	loginUserFailure,
	setUser,
	clearUser,
} = authSlice.actions

export const loginUser = (credentials) => async (dispatch) => {
	try {
		dispatch(loginUserStart())
		const response = await api.get('/auth/login', credentials)
		const { token } = response.data
		dispatch(loginUserSuccess(token))
	} catch (error) {
		dispatch(loginUserFailure(error.message))
	}
}

export const selectUser = (state) => state.auth.user

export const selectAuthError = (state) => state.auth.error

export default authSlice.reducer
