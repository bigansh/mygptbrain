import uploadDocument from '../../functions/crud/document/uploadDocument.js'

/**
 * A controller to handle the create requests for documents
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const create = async (req, res) => {
	try {
		const { query_type } = req.query

		// const { profile_id } = req.user

		let data

		if (query_type === 'upload') {
			await uploadDocument(await req.file())
		}
	} catch (error) {
		throw error
	}
}

export default create
