import uploadDocument from '../document/uploadDocument.js'

import loadAndSplit from '../processing/loadAndSplit.js'
import embedAndStore from '../processing/embedAndStore.js'

/**
 * A function that loads/uploads the documents and then stores them in the DB after processing it
 *
 * @param {String} profile_id
 * @param {import("@fastify/multipart").MultipartFile} file
 */
const documentLoadAndStore = async (profile_id, file = undefined) => {
	try {
		if (!file) throw new Error('File not present')

		const document = await uploadDocument(file, profile_id)

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
