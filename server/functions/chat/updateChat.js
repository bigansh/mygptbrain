import { Chat } from '../../utils/initializers/prisma'

/**
 * A function that updates the said chat with the latest outputs
 *
 * @param {import("../../utils/types/chatQueryObject").chatQueryObject} chatQueryObject
 */
const updateChat = async (chatQueryObject) => {
	try {
		if (!chatQueryObject.chat_id) throw new Error('No chat ID found.')

		return await Chat.update({
			where: { chat_id: chatQueryObject.chat_id },
			data: chatQueryObject,
		})
	} catch (error) {
		throw error
	}
}

export default updateChat