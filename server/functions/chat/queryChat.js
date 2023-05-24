import {
	ConversationalRetrievalQAChain,
	loadQAMapReduceChain,
	loadQAStuffChain,
	loadQARefineChain,
} from 'langchain/chains'

import openaiClient from '../../utils/api/openai.js'

import { vectorStore } from '../processing/embedAndStore.js'

import { Chat } from '../../utils/initializers/prisma.js'

/**
 * A function that manages queries of a chat
 *
 * @param {import("../../utils/types/chatQueryObject.js").chatQueryObject} chatQueryObject
 * @param {String} profile_id
 */
const queryChat = async (chatQueryObject, profile_id) => {
	try {
		const foundChat = await Chat.findUnique({
			where: { chat_id: chatQueryObject.chat_id },
			include: { preferences: true },
		})

		const model = openaiClient()

		const chain = new ConversationalRetrievalQAChain({
			combineDocumentsChain: loadQAStuffChain(model),
			questionGeneratorChain: loadQAStuffChain(model),
			retriever: vectorStore.asRetriever(5),
			returnSourceDocuments: true,
		})
	} catch (error) {
		throw error
	}
}

export default queryChat
