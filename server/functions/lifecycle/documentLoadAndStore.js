import uploadDocument from '../document/uploadDocument.js'

import loadAndSplit from '../processing/loadAndSplit.js'
import embedAndStore from '../processing/embedAndStore.js'

/**
 * A function that loads/uploads the documents and then stores them in the DB after processing it
 *
 * @param {String} profile_id
 * @param {String} process_type
 * @param {import("@fastify/multipart").MultipartFile} file
 * @param {import('@prisma/client').Document} document
 */
const documentLoadAndStore = async (
	profile_id,
	process_type = undefined,
	file = undefined,
	document = undefined
) => {
	try {
		if (process_type === 'upload') {
			if (!file) throw new Error('File not present')

			document = await uploadDocument(file, profile_id)
		}

		if (!document) throw new Error('Failed to load the document')

		const chunks = await loadAndSplit(document, profile_id)

		await embedAndStore(chunks)

		return {
			documentLoaded: true,
		}
	} catch (error) {
		throw error
	}
}

export default documentLoadAndStore
