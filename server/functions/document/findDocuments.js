import { Document } from '../../utils/initializers/prisma.js'

/**
 * A function that returns the found document
 *
 * @param {import('../../utils/types/documentQueryObject.js').documentQueryObject} documentQueryObject
 */
const findDocuments = async (documentQueryObject) => {
	try {
		return await Document.findMany({
			where: documentQueryObject,
			include: { documentMetadata: true },
			cacheStrategy: { ttl: 60 },
		})
	} catch (error) {
		throw error
	}
}

export default findDocuments
