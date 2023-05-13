import { User, Chat, ChatPreferences } from '../../utils/initializers/prisma.js'

/**
 * A function that deletes a chat object in the DB
 *
 * @param {String} chat_id
 * @param {String} profile_id
 */
const deleteChat = async (chat_id, profile_id) => {
	try {
		const foundChat = await Chat.findUnique({ where: { chat_id: chat_id } })

		if (foundChat.profile_id !== profile_id)
			throw new Error("You don't have access to this chat")

		await Promise.all([
			Chat.delete({ where: { chat_id: chat_id } }),

			ChatPreferences.delete({ where: { chat_id: chat_id } }),

			User.update({
				where: { profile_id: profile_id },
				data: {
					chats: { disconnect: { chat_id: chat_id } },
				},
			}),
		])

		return {
			chatDeleted: true,
		}
	} catch (error) {
		throw error
	}
}

export default deleteChat
