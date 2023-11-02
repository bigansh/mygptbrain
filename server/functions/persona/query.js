import { ConversationalRetrievalQAChain } from 'langchain/chains'

import { vectorStore } from '../../utils/api/supabase.js'
import { palm } from '../../utils/api/google.js'
import { gpt_turbo } from '../../utils/api/openai.js'

/**
 * A function that will return the query response for a persona
 *
 * @param {import("../../utils/types/chatQueryObject.js").chatQueryObject} chatQueryObject
 */
const query = async (chatQueryObject) => {
	try {
		const CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT = `Given the following conversation and a follow up question, return the conversation history excerpt that includes any relevant context to the question if it exists and rephrase the follow up question to be a standalone question.
		Chat History:
		{chat_history}
		Follow Up Input: {question}
		Your answer should follow the following format:
		\`\`\`
		Use the following pieces of context to answer the users question.
		If you don't know the answer, just say that you don't know, don't try to make up an answer. Don't try to be too smart. Don't make things up. Only answer if you have enough context. Don't answer from your learnings.
		----------------
		<Relevant chat history excerpt as context here>
		Standalone question: <Rephrased question here>
		\`\`\`
		Your answer:`

		const chain = ConversationalRetrievalQAChain.fromLLM(
			gpt_turbo,
			vectorStore.asRetriever(5, { author: chatQueryObject.author }),
			{
				returnSourceDocuments: true,
				verbose: true,
				questionGeneratorChainOptions: {
					template: CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT,
				},
			}
		)

		const res = await chain.call({
			question: chatQueryObject.prompt,
			chat_history: chatQueryObject.chat_history || '',
		})

		return {
			chat_array: [
				...chatQueryObject?.chat_array,
				{
					llm: res.text,
					user: chatQueryObject.prompt,
				},
			],
			source_documents: res.sourceDocuments.map((document) => {
				return {
					title: document.metadata.title,
					url: document.metadata.chunk_source,
				}
			}),
			chat_history: `${chatQueryObject?.chat_history}\n\nuser input: ${chatQueryObject.prompt}\ngenerated result: ${res.text}`,
		}
	} catch (error) {
		throw error
	}
}

export default query
