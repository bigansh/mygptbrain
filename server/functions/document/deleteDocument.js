import { Chat, Document } from '../../utils/initializers/prisma.js'
import pineconeIndex from '../../utils/api/pinecone.js'

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
			throw new Error("You don't have access to this document.")

		await Promise.all([
			Document.delete({ where: { document_id: document_id } }),

			Chat.findMany({
				where: { source_documents: { hasSome: [document_id] } },
				select: { source_documents: true },
			}).then(async (chats) => {
				try {
					for await (const chat of chats) {
						const newSourceDocuments = chat.source_documents.filter(
							(id) => id !== document_id
						)

						await Chat.update({
							where: { chat_id: chat.chat_id },
							data: { source_documents: newSourceDocuments },
						})
					}
				} catch (error) {
					throw error
				}
			}),

			pineconeIndex._delete({
				deleteRequest: {
					filter: {
						document_id: document_id,
						profile_id: profile_id,
					},
				},
			}),
		])

		return {
			documentDeleted: true,
		}
	} catch (error) {
		throw error
	}
}

export default deleteDocument
