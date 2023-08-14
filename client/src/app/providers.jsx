'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThreadsProvider, useThreads, UserProvider, useUser } from '@/context'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '@fontsource/poppins'
import { Logtail } from '@logtail/browser'

const colors = {
	brand: {
		900: '#1a365d',
		800: '#153e75',
		700: '#2a69ac',
	},
}
const fonts = {
	heading: `'Poppins', sans-serif`,
	body: `'Poppins', sans-serif`,
}
export const theme = extendTheme({ colors, fonts })
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			retry: 1,
			staleTime: 60 * 1000 * 10, // 10 minute
			//enabled: false,
		},
	},
})

export const logtail = new Logtail('EFgZ1Fe1TgHWWNCnknBWjdkS')

export function Providers({ children }) {
	return (
		<UserProvider>
			<ThreadsProvider>
				<QueryClientProvider client={queryClient}>
					<CacheProvider>
						<ChakraProvider theme={theme}>
							{children}
							<ReactQueryDevtools initialIsOpen={false} />
						</ChakraProvider>
					</CacheProvider>
				</QueryClientProvider>
			</ThreadsProvider>
		</UserProvider>
	)
}
