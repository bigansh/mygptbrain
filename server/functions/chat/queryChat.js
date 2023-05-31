import {
	ConversationalRetrievalQAChain,
	loadQAMapReduceChain,
	loadQAStuffChain,
	loadQARefineChain,
} from 'langchain/chains'
import { PineconeStore } from 'langchain/vectorstores/pinecone'

import { embeddings, model } from '../../utils/api/openai.js'
import { Chat } from '../../utils/initializers/prisma.js'
import pineconeIndex from '../../utils/api/pinecone.js'

/**
 * A function that manages queries of a chat
 *
 * @param {import("../../utils/types/chatQueryObject.js").chatQueryObject} chatQueryObject
 */
const queryChat = async (chatQueryObject) => {
	try {
		const foundChat = await Chat.findUnique({
			where: { chat_id: chatQueryObject.chat_id },
			include: { preferences: true },
		})

		const { preferences, chat_history } = foundChat

		const pineconeQuery = {
			chunk_source: preferences.data_sources,
			profile_id: foundChat.profile_id,
		}

		const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
			pineconeIndex,
		})

		const chain = new ConversationalRetrievalQAChain({
			combineDocumentsChain: loadQAStuffChain(model),
			questionGeneratorChain: loadQAStuffChain(model),
			retriever: vectorStore.asRetriever(5, pineconeQuery),
			returnSourceDocuments: true,
		})

		const res = await chain.call({})
	} catch (error) {
		throw error
	}
}

export default queryChat
