import { Chat } from '../../utils/initializers/prisma.js'

/**
 * A function that updates the said chat with the latest outputs
 *
 * @param {import("../../utils/types/chatQueryObject").chatQueryObject} chatQueryObject
 */
const updateChat = async (chatQueryObject) => {
	try {
		if (!chatQueryObject.chat_id) {
			throw new Error('No such chat found.')
		}

		chatQueryObject = { ...chatQueryObject, preferences: undefined }

		return await Chat.update({
			where: { chat_id: chatQueryObject.chat_id },
			data: {
				preferences: chatQueryObject.preferences,
				...chatQueryObject,
			},
			include: { preferences: true },
		})
	} catch (error) {
		throw error
	}
}

export default updateChat
