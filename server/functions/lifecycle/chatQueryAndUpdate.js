import findChats from '../chat/findChats.js'
import updateChat from '../chat/updateChat.js'
import promptQuery from '../processing/promptQuery.js'

/**
 * A function that will answer the user's query and update the chat in the context
 *
 * @param {import("../../utils/types/chatQueryObject").chatQueryObject} chatQueryObject
 */
const chatQueryAndUpdate = async (chatQueryObject) => {
	try {
		const foundChat = await findChats(chatQueryObject, true)

		if (foundChat) throw new Error('No chat with that Chat ID exists.')

		const promptResult = await promptQuery(
			chatQueryObject.prompt,
			foundChat[0]
		)

		chatQueryObject.chat_history = `${{
			...foundChat[0].chat_history,
		}}\n\n\n\nuser input: ${
			chatQueryObject.prompt
		}\n\ngenerated result:${promptResult}`

		await updateChat(chatQueryObject)

		return promptResult
	} catch (error) {
		throw error
	}
}

export default chatQueryAndUpdate
