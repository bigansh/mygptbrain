import { Document } from '../../utils/initializers/prisma.js'

/**
 * A function that returns the found document
 *
 * @param {import('../../utils/types/documentQueryObject.js').documentQueryObject} documentQueryObject
 * @param {Object} selectObject
 */
const findDocuments = async (documentQueryObject, selectObject = undefined) => {
	try {
		if (selectObject)
			return await Document.findMany({
				where: documentQueryObject,
				select: { documentMetadata: true, ...selectObject },
			})
		else
			return await Document.findMany({
				where: documentQueryObject,
				include: { documentMetadata: true },
			})
	} catch (error) {
		throw error
	}
}

export default findDocuments
