import createChat from '../chat/createChat.js'
import updateChat from '../chat/updateChat.js'
import promptQuery from '../processing/promptQuery.js'

/**
 * A function that will query a user's input and create a new chat with that query
 *
 * @param {String} profile_id
 * @param {import("../../utils/types/chatQueryObject").chatQueryObject} chatQueryObject
 */
const chatCreateAndQuery = async (profile_id, chatQueryObject) => {
	try {
		const createdChat = await createChat({
			chat_name: 'untitled',
			chat_history: '',
			profile_id: profile_id,
			preferences: chatQueryObject?.preferences,
		})

		const promptResult = await promptQuery(
			chatQueryObject.prompt,
			createdChat
		)

		chatQueryObject.chat_name = chatQueryObject.prompt
		chatQueryObject.chat_history = `user input: ${chatQueryObject.prompt}\ngenerated result: ${promptResult.response}`
		chatQueryObject.chat_array = [
			{ user: chatQueryObject.prompt, llm: promptResult.response },
		]
		chatQueryObject.source_documents = [
			...new Set(promptResult.sourceDocumentIds),
		]
		chatQueryObject.prompt = undefined

		return await updateChat({
			...chatQueryObject,
			profile_id: profile_id,
			chat_id: createdChat.chat_id,
		})
	} catch (error) {
		throw error
	}
}

export default chatCreateAndQuery
