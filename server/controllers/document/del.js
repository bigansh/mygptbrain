import deleteDocument from '../../functions/document/deleteDocument.js'

/**
 * A controller to handle the delete requests for a document
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const del = async (req, res) => {
	try {
		const { profile_id } = req.user

		/**
		 * @type {{documentQueryObject: import('../../utils/types/documentQueryObject.js').documentQueryObject}}
		 */
		const { documentQueryObject } = req.body

		if (!documentQueryObject) throw new Error('Document object not found.')

		const data = await deleteDocument(documentQueryObject, profile_id)

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default del
