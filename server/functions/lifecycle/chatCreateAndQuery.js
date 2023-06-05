import createChat from '../chat/createChat.js'
import promptQuery from '../processing/promptQuery.js'

/**
 * A function that will query a user's input and create a new chat with that query
 *
 * @param {String} profile_id
 * @param {import("../../utils/types/chatQueryObject").chatQueryObject} chatQueryObject
 */
const chatCreateAndQuery = async (profile_id, chatQueryObject) => {
	try {
		const promptResult = await promptQuery(chatQueryObject.prompt)

		chatQueryObject.chat_name = promptResult.substring(0, 10)
		chatQueryObject.chat_history = `user input: ${chatQueryObject.prompt}\n\ngenerated result: ${promptResult}`

		await createChat(profile_id, chat_name, chat_history)

		return promptResult
	} catch (error) {
		throw error
	}
}

export default chatCreateAndQuery
