import chatCreateAndQuery from '../../functions/lifecycle/chatCreateAndQuery.js'

/**
 * A controller to handle the create requests for chat
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const create = async (req, res) => {
	try {
		const { profile_id } = req.user

		/**
		 * @type {{chatQueryObject: import('../../utils/types/chatQueryObject.js').chatQueryObject}}
		 */
		const { chatQueryObject } = req.body

		if (!chatQueryObject) throw new Error("Chat query doesn't exist.")

		const data = await chatCreateAndQuery(profile_id, chatQueryObject)

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default create
