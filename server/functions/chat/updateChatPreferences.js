import { Chat, ChatPreferences } from '../../utils/initializers/prisma.js'

/**
 * A function that updates the chat preferences
 *
 * @param {String} chat_id
 * @param {String} profile_id
 * @param {import("../../utils/types/chatPreferencesObject").chatPreferencesObject} charPreferencesObject
 */
const updateChatPreferences = async (
	chat_id,
	profile_id,
	charPreferencesObject
) => {
	try {
		const foundChat = await Chat.findUnique({ where: { chat_id: chat_id } })

		if (foundChat.profile_id !== profile_id)
			throw new Error("You don't have access to this chat")

		const updatedChatPreferences = await ChatPreferences.update({
			data: charPreferencesObject,
			where: { chat_id: chat_id },
		})

		return updatedChatPreferences
	} catch (error) {
		throw error
	}
}

export default updateChatPreferences
