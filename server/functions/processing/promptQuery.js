import { ConversationalRetrievalQAChain } from 'langchain/chains'
import { PineconeStore } from 'langchain/vectorstores/pinecone'

import { embeddings, gpt_4, gpt_turbo } from '../../utils/api/openai.js'
import { palm } from '../../utils/api/google.js'
import { cohere } from '../../utils/api/cohere.js'
import pineconeIndex from '../../utils/api/pinecone.js'
import mixpanel from '../../utils/api/mixpanel.js'

/**
 * A function that will query the LLMs based on the user prompt and chat history
 *
 * @param {String} prompt
 * @param {import("@prisma/client").Chat} chat
 */
const promptQuery = async (prompt, chat) => {
	try {
		if (!chat) throw new Error('No chat with that chat_id found.')

		const { preferences, chat_history, user } = chat

		let model,
			send_type,
			pineconeQuery = {
				profile_id: chat.profile_id,
			}

		if (preferences.llm_model === 'ChatGPT') {
			model = gpt_turbo
		} else if (preferences.llm_model === 'GPT4') {
			model = gpt_4
		} else if (preferences.llm_model === 'PaLM') {
			model = palm
		} else if (preferences.llm_model === 'Cohere') {
			model = cohere
		}

		if (!preferences.data_sources.includes('All')) {
			pineconeQuery = {
				...pineconeQuery,
				chunk_source: { $in: preferences.data_sources },
			}
		} else if (preferences.document_id) {
			pineconeQuery = {
				...pineconeQuery,
				document_id: preferences.document_id,
			}
		}

		// if (preferences.send_type === 'Stuff') {
		// 	send_type = 'stuff'
		// } else if (preferences.send_type === 'Map Reduce') {
		// 	send_type = 'map_reduce'
		// } else if (preferences.send_type === 'Refine') {
		// 	send_type = 'refine'
		// }

		const promptTemplate = `Given the following conversation and a follow up question, provide the most accurate response. ${
			user.userMetadata.prompt_templates[preferences.prompt_template]
		}
		Chat History: {chat_history}
		Follow Up Input: {question}
		Input Documents: {context}
		`

		const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
			pineconeIndex: pineconeIndex,
		})

		const chain = ConversationalRetrievalQAChain.fromLLM(
			model,
			vectorStore.asRetriever(5, pineconeQuery),
			{
				returnSourceDocuments: true,
				// qaChainOptions: { type: send_type },
				qaTemplate: promptTemplate,
			}
		)

		const res = await chain.call({
			question: prompt,
			chat_history: chat_history,
		})

		mixpanel.track('query_chat', {
			distinct_id: chat.profile_id,
			user_query: prompt,
			chat_id: chat.chat_id,
		})

		const sourceDocumentIds = res.sourceDocuments.map(
			(document) => document.metadata.document_id
		)

		return { response: res.text, sourceDocumentIds: sourceDocumentIds }
	} catch (error) {
		throw error
	}
}

export default promptQuery
