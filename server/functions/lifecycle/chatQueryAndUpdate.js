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
		const foundChat = await findChats(
			{ chat_id: chatQueryObject.chat_id },
			true
		)

		if (!foundChat) throw new Error('No chat with that Chat ID exists.')

		const promptResult = await promptQuery(
			chatQueryObject.prompt,
			foundChat[0]
		)

		chatQueryObject.chat_history = `${foundChat[0].chat_history}\n\nuser input: ${chatQueryObject.prompt}\ngenerated result: ${promptResult.response}`
		chatQueryObject.chat_array = [
			...foundChat[0].chat_array,
			{ user: chatQueryObject.prompt, llm: promptResult.response },
		]
		chatQueryObject.source_documents = [
			...new Set(promptResult.sourceDocumentIds),
		]
		chatQueryObject.prompt = undefined

		return await updateChat(chatQueryObject)
	} catch (error) {
		throw error
	}
}

export default chatQueryAndUpdate
