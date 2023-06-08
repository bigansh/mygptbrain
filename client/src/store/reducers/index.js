import { combineReducers } from 'redux'
import authReducer from './authSlice'
import chatReducer from './chatSlice'
import googleAuthReducer from './googleAuthReducer'

const rootReducer = combineReducers({
	auth: authReducer,
	chat: chatReducer,
	googleAuth: googleAuthReducer,
})

export default rootReducer
