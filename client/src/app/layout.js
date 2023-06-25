'use client'

import { ThemeProvider } from 'next-themes'
import { Poppins } from 'next/font/google'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Script from 'next/script'
import { UserProvider } from './context/UserContext'

const poppins = Poppins({
	subsets: ['latin'],
	display: 'fallback',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			retry: 1,
		},
	},
})
export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={poppins.className}>
				<UserProvider>
					<QueryClientProvider client={queryClient}>
						<ThemeProvider attribute='class'>
							{children}
						</ThemeProvider>
					</QueryClientProvider>
				</UserProvider>
				<Script src='../path/to/flowbite/dist/flowbite.min.js' />
				{/* <script src='../path/to/flowbite/dist/flowbite.min.js'></script> */}
			</body>
		</html>
	)
}
