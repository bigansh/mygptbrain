import { User, Chat, ChatPreferences } from '../../utils/initializers/prisma.js'

/**
 * A function that creates a chat object in the DB
 *
 * @param {String} profile_id
 */
const createChat = async (profile_id) => {
	try {
		const createdChat = await Chat.create({
			data: { profile_id, preferences: { create: {} } },
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
