import updateChatPreferences from '../../functions/chat/updateChatPreferences.js'
import chatQueryAndUpdate from '../../functions/lifecycle/chatQueryAndUpdate.js'

/**
 * A controller to handle the update requests for chat
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const update = async (req, res) => {
	try {
		const { query_type } = req.query

		const { profile_id } = req.user

		let data

		if (query_type === 'preferences') {
			/**
			 * @type {{chatPreferences: import('../../utils/types/chatPreferencesObject.js').chatPreferencesObject}}
			 */
			const { chat_id, chatPreferences } = req.body

			data = await updateChatPreferences(
				chat_id,
				profile_id,
				chatPreferences
			)
		} else if (query_type === 'chat') {
			/**
			 * @type {{chatQueryObject: import('../../utils/types/chatQueryObject.js').chatQueryObject}}
			 */
			const { chatQueryObject } = req.body

			if (chatQueryObject) throw new Error("Chat query doesn't exist.")

			data = await chatQueryAndUpdate(chatQueryObject)
		}

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default update
