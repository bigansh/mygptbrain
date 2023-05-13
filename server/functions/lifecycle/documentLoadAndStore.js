import uploadDocument from '../crud/document/uploadDocument.js'

import loadAndSplit from '../processing/loadAndSplit.js'
import embedAndStore from '../processing/embedAndStore.js'


/**
 * A function that loads/uploads the documents and then stores them in the DB after processing it
 * 
 * @param {String} loadType
 * @param {String} profile_id
 * @param {import("@fastify/multipart").MultipartFile} file
 */
const documentLoadAndStore = async (loadType, profile_id, file = undefined) => {
	try {
		if (loadType === 'upload' && file) {
			const document = await uploadDocument(file, profile_id)

			const chunks = await loadAndSplit(document, profile_id)

			await embedAndStore(chunks)
		}
	} catch (error) {
		throw error
	}
}

export default documentLoadAndStore
