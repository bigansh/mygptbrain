import xss from 'xss'

import checkSubscription from '../utility/checkSubscription.js'

import mixpanel from '../../utils/api/mixpanel.js'
import { Chat } from '../../utils/initializers/prisma.js'

/**
 * A function that creates a chat object in the DB
 *
 * @param {import('../../utils/types/chatQueryObject.js').chatQueryObject} chatQueryObject
 */
const createChat = async (chatQueryObject) => {
	try {
		const foundChats = await Chat.findMany({
			where: { profile_id: chatQueryObject.profile_id },
			select: { chat_id: true },
		})

		if (foundChats.length >= 5) {
			await checkSubscription(chatQueryObject.profile_id)
		}

		chatQueryObject.chat_history = xss(chatQueryObject.chat_history)

		const createdChat = await Chat.create({
			data: {
				profile_id: chatQueryObject.profile_id,
				chat_name: chatQueryObject.chat_name,
				chat_history: chatQueryObject.chat_history,
				preferences: {
					create: {
						document_id: chatQueryObject?.preferences?.document_id,
					},
				},
			},
			include: { preferences: true },
		})

		mixpanel.track('create_chat', {
			distinct_id: chatQueryObject.profile_id,
		})

		return createdChat
	} catch (error) {}
}

export default createChat
