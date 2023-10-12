export function getSourceFromArray(arr) {
	// Create an array to store the sources
	const sources = []

	// Iterate through the array of objects
	for (const obj of arr) {
		// Check if the object has a "documentMetadata" property
		if (obj.documentMetadata) {
			// Check if the "documentMetadata" object has a "source" property
			if (obj.documentMetadata.source) {
				// Push the source into the sources array
				sources.push(obj.documentMetadata.source)
			}
		}
	}

	// Return the array of sources
	return sources
}

export const removeTokens = () => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('x-session-token')
		localStorage.removeItem('modal-display')
		document.cookie =
			'x-session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
		document.cookie =
			'x-session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.mygptbrain.xyz'
	}
}
