import { Document } from 'utils/initializers/prisma.js'

/**
 * A function that returns the found document
 *
 * @param {import('utils/types/documentQueryObjects').documentMetadataObjects} query
 */
const findDocuments = async (query) => {
	try {
		return await Document.findMany({
			where: query,
			include: { documentMetadata: true, user: true },
		})
	} catch (error) {
		throw error
	}
}

export default findDocuments
