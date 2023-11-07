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
		const promptTemplate = `Emulate the style and tone of the conversation while maintaining a clear and informative approach. When drawing upon specific elements from the context, ensure to directly quote those elements before providing your explanation. This will enhance the transparency and traceability of your responses. For instance, if referencing a particular line from the conversation, quote the line verbatim and then proceed to explain its significance or meaning. Similarly, if citing a passage from a blog or article, directly quote the relevant excerpt before offering your analysis or interpretation. By adhering to this principle of explicit quotation, you will strengthen the coherence and credibility of your responses, making them more informative and engaging for the user. 
		Chat History: {chat_history}
		Follow Up Input: {question}
		Input Documents: {context}`
		// const promptTemplate = `Provide the most accurate response. The response should primarily rely on quoting specific text from the context and then explaining the meaning or relevance of that quoted text. Avoid generating entirely new content; instead, use the existing conversation or context. If the context is a conversation between people, quote the relevant parts of the conversation and provide insights based on those quotes. If the context feels like a blog/article, quote the text that you used to generate the response from and elucidate the meaning or significance of those quotes. The response should emulate the delivery and style of the context passed.
		// Chat History: {chat_history}
		// Follow Up Input: {question}
		// Input Documents: {context}`

		const chain = ConversationalRetrievalQAChain.fromLLM(
			gpt_turbo,
			vectorStore.asRetriever(5, { author: chatQueryObject.author }),
			{
				returnSourceDocuments: true,
				verbose: true,
				qaTemplate: promptTemplate,
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
