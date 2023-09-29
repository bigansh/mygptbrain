// hooks/useUserQuery.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
	getDoc,
	getUser,
	readChat,
	scrapeLink,
	syncDoc,
	uploadDoc,
} from '@/api'
import { useToast } from '@chakra-ui/react'
import { logtail } from './providers'

// hooks/useUserData.js
export const useUserData = () => {
	return useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	})
}

// hooks/useThreadsData.js
export const useThreadsData = ({ enabled, funcArgs }) => {
	return useQuery({
		queryKey: ['threads'],
		queryFn: () => readChat(funcArgs),
		enabled,
		onError: (error) => {
			logtail.info('Error getting threads', error)
			logtail.flush()
		},
	})
}

export const useThreadData = ({ currentThread, enabled }) => {
	return useQuery({
		queryKey: ['threads', currentThread],
		enabled: enabled,
		onError: (error) => {
			logtail.info('Error getting thread', error)
			logtail.flush()
		},
	})
}

// hooks/useDocumentsData.js
export const useDocumentsData = ({ enabled, funcArgs }) => {
	return useQuery({
		queryKey: ['documents'],
		queryFn: () => getDoc(funcArgs),
		enabled: enabled,
		onError: (error) => {
			logtail.info('Error getting document', error)
			logtail.flush()
		},
	})
}

// export const useDocumentData = ({ currentDocument, enabled, funcArgs }) => {
// 	return useQuery({
// 		queryKey: ['documents',],
// 		queryFn: () => getDoc(funcArgs),
// 		enabled: enabled,
// 		onError: (error) => {
// 			logtail.info('Error getting thread', error)
// 			logtail.flush()
// 		},
// 	})
// }

export const useUploadDoc = () => {
	const queryClient = useQueryClient()
	const toast = useToast()

	return useMutation((file) => uploadDoc(file), {
		onSuccess: () => {
			queryClient.invalidateQueries(['documents'])
			toast({
				title: 'Document uploaded successfully',
				position: 'top',
				variant: 'solid',
				status: 'success',
				duration: 3000,
			})
		},
		onError: (error) => {
			toast({
				title: 'Error uploading document',
				position: 'top',
				variant: 'solid',
				status: 'error',
				duration: 3000,
			})
			logtail.info('Error uploading document', error)
			logtail.flush()
		},
	})
}

export const useSyncDoc = () => {
	const toast = useToast()

	return useMutation(() => syncDoc(), {
		onSuccess: () => {
			toast({
				title: 'Data synced successfully',
				position: 'top',
				variant: 'solid',
				status: 'success',
				duration: 3000,
			})
		},
		onError: (error) => {
			toast({
				title: 'Error syncing data',
				position: 'top',
				variant: 'solid',
				status: 'error',
				duration: 3000,
			})
			logtail.info('Error syncing data', error)
			logtail.flush()
		},
	})
}

export const useScrapeLink = ({ link, onSuccess }) => {
	const queryClient = useQueryClient()
	const toast = useToast()

	return useMutation(() => scrapeLink(link), {
		onSuccess: () => {
			queryClient.invalidateQueries(['documents'])
			toast({
				title: 'Link scraped successfully',
				position: 'top',
				variant: 'solid',
				status: 'success',
				duration: 3000,
			})
			onSuccess()
		},
		onError: (error) => {
			toast({
				title: 'Error uploading link',
				position: 'top',
				variant: 'solid',
				status: 'error',
				duration: 3000,
			})
			logtail.info('Error uploading link', error)
			logtail.flush()
		},
	})
}
