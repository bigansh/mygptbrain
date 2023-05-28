import { PineconeStore } from 'langchain/vectorstores/pinecone'

import pineconeIndex from '../../utils/api/pinecone.js'
import { embeddings } from '../../utils/api/openai.js'

/**
 * A function that creates the OpenAI embeddings of the chunks and stores them to the DB
 *
 * @param {import('langchain/document').Document[]} chunks
 */
const embedAndStore = async (chunks) => {
	try {
		await PineconeStore.fromDocuments(chunks, embeddings, pineconeIndex)
	} catch (error) {
		throw error
	}
}

export default embedAndStore
