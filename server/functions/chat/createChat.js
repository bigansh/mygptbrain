import { User, Chat } from '../../utils/initializers/prisma.js'

/**
 * A function that creates a chat object in the DB
 *
 * @param {import('../../utils/types/chatQueryObject.js').chatQueryObject} chatQueryObject
 */
const createChat = async (chatQueryObject) => {
	try {
		const createdChat = await Chat.create({
			data: {
				profile_id: chatQueryObject.profile_id,
				chat_name: chatQueryObject.chat_name,
				chat_history: chatQueryObject.chat_history,
				preferences: { create: {} },
				// ! Check if we need to attach the user here.
			},
		})

		await User.update({
			where: { profile_id: profile_id },
			data: {
				chats: { connect: { chat_id: createdChat.chat_id } },
			},
		})

		return createdChat
	} catch (error) {}
}

export default createChat
