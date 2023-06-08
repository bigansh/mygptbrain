'use client'

import { configureStore } from '@reduxjs/toolkit'
import { ThemeProvider } from 'next-themes'
import { Poppins } from 'next/font/google'
import { Provider } from 'react-redux'
import rootReducer from '../store/reducers'

import './globals.css'

const store = configureStore({
	reducer: rootReducer,
})

const poppins = Poppins({
	subsets: ['latin'],
	display: 'fallback',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={poppins.className}>
				<Provider store={store}>
					<ThemeProvider attribute='class'>{children}</ThemeProvider>
				</Provider>
			</body>
		</html>
	)
}
