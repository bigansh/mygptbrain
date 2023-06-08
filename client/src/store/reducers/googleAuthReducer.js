import { LOGIN_SUCCESS, LOGOUT } from '../../api/googleAuth'

const initialState = {
	token: localStorage.getItem('sessionToken') || null,
	isAuthenticated: !!localStorage.getItem('sessionToken'),
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				token: action.payload,
				isAuthenticated: true,
			}
		case LOGOUT:
			return {
				...state,
				token: null,
				isAuthenticated: false,
			}
		default:
			return state
	}
}

export default authReducer
