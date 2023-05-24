import findDocuments from '../../functions/document/findDocuments'

/**
 * A controller to handle the read requests for documents
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const read = async (req, res) => {
	try {
		const { query } = req.body

		if (!query) throw new Error('Query not found.')

		const data = await findDocuments(query)

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default read
