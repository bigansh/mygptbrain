import { Document } from '../../utils/initializers/prisma.js'
import checkSubscription from '../utility/checkSubscription.js'

/**
 * A function that will create a new document for a user
 *
 * @param {String} profile_id
 * @param {import("@prisma/client").Document} documentQueryObject
 */
const createDocument = async (profile_id, documentQueryObject) => {
	try {
		const foundDocuments = await Document.findMany({
			where: { profile_id: profile_id },
			select: { document_id: true },
		})

		if (foundDocuments.length > 10) {
			await checkSubscription(profile_id)
		}

		return await Document.create({
			data: documentQueryObject,
			include: { documentMetadata: true },
		})
	} catch (error) {
		throw error
	}
}

export default createDocument
