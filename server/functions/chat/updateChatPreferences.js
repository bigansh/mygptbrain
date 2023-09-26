import { Chat, ChatPreferences } from '../../utils/initializers/prisma.js'

/**
 * A function that updates the chat preferences
 *
 * @param {String} profile_id
 * @param {import("../../utils/types/chatPreferencesObject").chatPreferencesObject} chatPreferencesObject
 */
const updateChatPreferences = async (profile_id, chatPreferencesObject) => {
	try {
		const foundChat = await Chat.findUnique({
			where: { chat_id: chatPreferencesObject.chat_id },
		})

		if (foundChat.profile_id !== profile_id) {
			throw new Error("You don't have access to this chat")
		}

		const updatedChatPreferences = await ChatPreferences.update({
			data: chatPreferencesObject,
			where: { chat_id: chatPreferencesObject.chat_id },
		})

		return updatedChatPreferences
	} catch (error) {
		throw error
	}
}

export default updateChatPreferences
