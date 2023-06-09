import { PineconeStore } from 'langchain/vectorstores/pinecone'

import pineconeIndex from '../../utils/api/pinecone.js'
import { embeddings } from '../../utils/api/openai.js'
import mixpanel from '../../utils/api/mixpanel.js'

/**
 * A function that creates the OpenAI embeddings of the chunks and stores them to the DB
 *
 * @param {import('langchain/document').Document[]} chunks
 */
const embedAndStore = async (chunks) => {
	try {
		await PineconeStore.fromDocuments(chunks, embeddings, { pineconeIndex })

		mixpanel.people.increment(
			chunks[0].metadata.profile_id,
			'chunks',
			chunks.length
		)

		return
	} catch (error) {
		throw error
	}
}

export default embedAndStore
