// hooks/useUserQuery.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
	getDoc,
	getUser,
	readChat,
	scrapeLink,
	syncDoc,
	updateChatPreferences,
	updatePersona,
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

export const useUploadDoc = ({ onSuccess }) => {
	const queryClient = useQueryClient()
	const toast = useToast()

	return useMutation((file) => uploadDoc(file), {
		onSuccess: (data) => {
			queryClient.invalidateQueries(['documents'])
			toast({
				title: 'document uploaded',
				position: 'top',
				variant: 'subtle',
				status: 'success',
				duration: 3000,
			})
			onSuccess(data)
		},
		onError: (error) => {
			toast({
				title: 'error uploading document',
				position: 'top',
				variant: 'subtle',
				status: 'error',
				duration: 3000,
			})
			logtail.info('Error uploading document', error)
			logtail.flush()
		},
	})
}

export const useSyncDoc = (onSuccess = () => {}) => {
	const toast = useToast()

	return useMutation(() => syncDoc(), {
		onSuccess: () => {
			toast({
				title: 'platforms synced',
				position: 'top',
				variant: 'subtle',
				status: 'success',
				duration: 3000,
			})
			onSuccess()
		},
		onError: (error) => {
			toast({
				title: 'error syncing data',
				position: 'top',
				variant: 'subtle',
				status: 'error',
				duration: 3000,
			})
			logtail.info('Error syncing data', error)
			logtail.flush()
			onSuccess()
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
				title: 'link scraped',
				position: 'top',
				variant: 'subtle',
				status: 'success',
				duration: 3000,
			})
			onSuccess()
		},
		onError: (error) => {
			toast({
				title: 'error scraping the link',
				position: 'top',
				variant: 'subtle',
				status: 'error',
				duration: 3000,
			})
			logtail.info('Error uploading link', error)
			logtail.flush()
		},
	})
}

export const useChatPreferences = ({ currentThread, onSuccess }) => {
	const toast = useToast()
	return useMutation({
		mutationFn: (llmTypeValue) =>
			updateChatPreferences({
				chat_id: currentThread,
				llm_model: llmTypeValue,
			}),

		onSuccess: (data) => {
			toast({
				title: 'chat preference updated',
				position: 'top',
				variant: 'subtle',
				status: 'success',
				duration: 3000,
			})
			onSuccess(data.llm_model)
		},

		onError: (error) => {
			logtail.info('Error updating chat preference', error)
			logtail.flush()
		},
	})
}

export const useChatPromptTemplate = ({ currentThread, onSuccess }) => {
	const toast = useToast()
	return useMutation({
		mutationFn: (template) =>
			updateChatPreferences({
				chat_id: currentThread,
				prompt_template: template,
			}),

		onSuccess: (data) => {
			toast({
				title: 'prompt template updated',
				position: 'top',
				variant: 'subtle',
				status: 'success',
				duration: 3000,
			})
			onSuccess(data.prompt_template)
		},

		onError: (error) => {
			logtail.info('Error updating chat prompt template', error)
			logtail.flush()
		},
	})
}

export const usePersonas = ({ onSuccess }) => {
	return useMutation({
		mutationFn: (newPersona) => updatePersona(newPersona),
		onSuccess: (data) => {
			onSuccess(data)
		},
		onError: (error) => {
			logtail.info('Error posting persona', error)
			logtail.flush()
		},
	})
}
