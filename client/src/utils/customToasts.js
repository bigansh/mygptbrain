import { useToast } from '@chakra-ui/react'

// Define all your toasts in an object with keys
const toasts = {
	UPLOAD_LIMIT_REACHED: {
		title: 'Upload Limit Reached',
		description: 'Upgrade to upload more files.',
		status: 'info',
	},
	FILE_TOO_LARGE: {
		title: 'File Too Large',
		description: 'Files over 10MB require a premium plan.',
		status: 'info',
	},
	PAID_IMAGE_UPLOAD: {
		title: 'Uploading images requires a paid plan',
		description: 'Please upgrade your plan to upload images.',
		status: 'info',
	},
	EMPTY_INPUT: {
		title: 'Empty Input',
		description: 'Please enter a valid input.',
		status: 'error',
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
		})
	}

	return showToast
}
