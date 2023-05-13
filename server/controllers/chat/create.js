import createChat from '../../functions/chat/createChat.js'

/**
 * A controller to handle the create requests for chat
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const create = async (req, res) => {
	try {
		const { query_type } = req.query

		const { profile_id } = req.user

		let data

		if (query_type === 'create') {
			data = await createChat(profile_id)
		}

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default create
