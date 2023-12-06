import xss from 'xss'

import checkSubscription from '../utility/checkSubscription.js'

import mixpanel from '../../utils/api/mixpanel.js'
import { Chat, User } from '../../utils/initializers/prisma.js'

/**
 * A function that creates a chat object in the DB
 *
 * @param {import('../../utils/types/chatQueryObject.js').chatQueryObject} chatQueryObject
 * @param {String} profile_id
 */
const createChat = async (chatQueryObject, profile_id) => {
	try {
		const user = await User.findFirst({
			where: { profile_id: profile_id },
			include: { userMetadata: true },
		})

		const foundChats = await Chat.findMany({
			where: {
				profile_id: profile_id,
				preferences: { document_id: null },
			},
			select: { chat_id: true },
		})

		if (foundChats.length >= 2) {
			await checkSubscription(profile_id)
		}

		chatQueryObject.chat_history = xss(chatQueryObject.chat_history)

		const createdChat = await Chat.create({
			data: {
				profile_id: profile_id,
				chat_name: chatQueryObject.chat_name,
				chat_history: chatQueryObject.chat_history,
				preferences: {
					create: {
						document_id: chatQueryObject?.preferences?.document_id,
						prompt_template:
							user.userMetadata.default_prompt_template,
					},
				},
			},
			include: {
				preferences: true,
				user: {
					select: {
						userMetadata: { select: { prompt_templates: true } },
					},
				},
			},
		})

		mixpanel.track('create_chat', {
			distinct_id: profile_id,
		})

		return createdChat
	} catch (error) {
		throw error
	}
}

export default createChat
