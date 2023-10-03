import findChats from '../../functions/chat/findChats.js'

/**
 * A controller to handle the read requests for chats
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const read = async (req, res) => {
	try {
		/**
		 * @type {{chatQueryObject: import('../../utils/types/chatQueryObject.js').chatQueryObject}}
		 */
		const { chatQueryObject } = req.body

		const { profile_id } = req.user

		if (!chatQueryObject) {
			throw new Error("Chat query doesn't exist.")
		}

		if (profile_id !== chatQueryObject.profile_id) {
			throw new Error("You aren't authorized to read this document.")
		}

		const data = await findChats(chatQueryObject, true)

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default read
