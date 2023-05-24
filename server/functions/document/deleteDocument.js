import {
	User,
	Document,
	DocumentMetadata,
	Vector,
} from '../../utils/initializers/prisma.js'

/**
 * A function that deletes a document object in the DB
 *
 * @param {import('../../utils/types/documentQueryObject.js').documentQueryObject} query
 * @param {String} profile_id
 */
const deleteDocument = async ({ document_id }, profile_id) => {
	try {
		const foundDocument = await Document.findUnique({
			where: { document_id: document_id },
		})

		if (foundDocument.profile_id !== profile_id)
			throw new Error("You don't have access to this chat")

		await Promise.all([
			Document.delete({ where: { chat_id: chat_id } }),

			DocumentMetadata.delete({ where: { chat_id: chat_id } }),

			Vector.deleteMany({ where: { document_id: document_id } }),

			User.update({
				where: { profile_id: profile_id },
				data: {
					documents: { disconnect: { document_id: document_id } },
				},
			}),
		])

		return {
			chatDeleted: true,
		}
	} catch (error) {
		throw error
	}
}

export default deleteDocument
