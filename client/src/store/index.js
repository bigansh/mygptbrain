import { configureStore } from '@reduxjs/toolkit'

import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'
import chatReducer from './reducers/chatReducer'
import googleAuthReducer from './reducers/googleAuthReducer'

const store = configureStore({
	reducer: {
		auth: authReducer,
		chat: chatReducer,
		googleAuth: googleAuthReducer,
	},
})

export default store
