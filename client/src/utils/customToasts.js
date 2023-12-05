import { useToast } from '@chakra-ui/react'

// Define all your toasts in an object with keys
const toasts = {
	UPLOAD_LIMIT_REACHED: {
		title: 'document limit exhausted',
		status: 'info',
		variant: 'subtle',
		duration: 5000,
	},
	FILE_TOO_LARGE: {
		title: 'file size too large',
		status: 'info',
		variant: 'subtle',
		duration: 5000,
	},
	PAID_IMAGE_UPLOAD: {
		title: 'Uploading images requires a paid plan',
		status: 'info',
		variant: 'subtle',
		duration: 5000,
	},
	EMPTY_INPUT: {
		title: 'please enter a valid url',
		status: 'error',
		duration: 5000,
	},
	// ... add more predefined toasts here
}

export const useToastManager = () => {
	const toast = useToast()

	const showToast = (key, options = {}) => {
		// Find the toast by key and override with any options provided
		const toastConfig = toasts[key]
		if (!toastConfig) {
			console.warn(`No toast found for key "${key}"`)
			return
		}

		toast({
			position: 'top',
			duration: 3000,
			...toastConfig,
			...options,

			variant: 'subtle',
		})
	}

	return showToast
}
