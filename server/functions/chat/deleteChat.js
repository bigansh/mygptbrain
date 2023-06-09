import mixpanel from '../../utils/api/mixpanel.js'
import { Chat } from '../../utils/initializers/prisma.js'

/**
 * A function that deletes a chat object in the DB
 *
 * @param {import('../../utils/types/chatQueryObject.js').chatQueryObject} query
 * @param {String} profile_id
 */
const deleteChat = async ({ chat_id }, profile_id) => {
	try {
		const foundChat = await Chat.findUnique({ where: { chat_id: chat_id } })

		if (foundChat.profile_id !== profile_id) {
			throw new Error("You don't have access to this chat")
		}

		await Chat.delete({ where: { chat_id: chat_id } })

		mixpanel.track('delete_chat', {
			distinct_id: profile_id,
			chat_id: chat_id,
		})

		return {
			chatDeleted: true,
		}
	} catch (error) {
		throw error
	}
}

export default deleteChat
