import query from '../../functions/persona/query.js'

/**
 * A controller to handle the chat requests for persona
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const chat = async (req, res) => {
	try {
		const data = await query(req.body.chatQueryObject)

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default chat
