import chatQueryAndUpdate from '../../functions/lifecycle/chatQueryAndUpdate'

/**
 * A controller to handle the query requests for chat
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const query = async (req, res) => {
	try {
		const { chatQueryObject } = req.body

		if (chatQueryObject) throw new Error("Chat query doesn't exist.")

		const data = await chatQueryAndUpdate(chatQueryObject)

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default query
