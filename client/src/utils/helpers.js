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
