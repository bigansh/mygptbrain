import findDocuments from '../../functions/document/findDocuments.js'

/**
 * A controller to handle the read requests for documents
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const read = async (req, res) => {
	try {
		/**
		 * @type {{documentQueryObject: import('../../utils/types/documentQueryObject.js').documentQueryObject}}
		 */
		const { documentQueryObject } = req.body

		const { profile_id } = req.user

		if (!documentQueryObject) {
			throw new Error('Document object not found.')
		}

		if (profile_id !== documentQueryObject.profile_id) {
			throw new Error("You aren't authorized to read this document.")
		}

		const data = await findDocuments(documentQueryObject)

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default read
