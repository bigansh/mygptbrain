import {
	ConversationalRetrievalQAChain,
	loadQAMapReduceChain,
	loadQAStuffChain,
	loadQARefineChain,
} from 'langchain/chains'
import { PineconeStore } from 'langchain/vectorstores/pinecone'

import { embeddings, model } from '../../utils/api/openai.js'
import pineconeIndex from '../../utils/api/pinecone.js'

/**
 * A function that will query the LLMs based on the user prompt and chat history
 *
 * @param {String} prompt
 * @param {import("@prisma/client").Chat} chat
 */
const promptQuery = async (prompt, chat = undefined) => {
	try {
		const { preferences, chat_history } = chat

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

		const res = await chain.call({
			question: prompt,
			chat_history: chat_history,
		})

		return res.text
	} catch (error) {
		throw error
	}
}

export default promptQuery
