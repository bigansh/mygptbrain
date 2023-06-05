import deleteChat from '../../functions/chat/deleteChat.js'

/**
 * A controller to handle the delete requests for a chat
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const del = async (req, res) => {
	try {
		const { profile_id } = req.user

		/**
		 * @type {{chatQueryObject: import('../../utils/types/chatQueryObject.js').chatQueryObject}}
		 */
		const { chatQueryObject } = req.body

		if (!chatQueryObject) throw new Error('Query not found.')

		const data = await deleteChat(chatQueryObject, profile_id)

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default del
