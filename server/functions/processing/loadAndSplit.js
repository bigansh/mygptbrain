import { Document } from 'langchain/document'
import { TokenTextSplitter } from 'langchain/text_splitter'

/**
 * A function that loads and splits the documents for the vector store
 *
 * @param {import('@prisma/client').Document} document
 */
const loadAndSplit = async (document) => {
	try {
		const vectorDocument = new Document({
			pageContent: document.body,
			metadata: {
				source: document.source,
				document_id: document.document_id,
			},
		})

		const splitter = new TokenTextSplitter({
			chunkSize: 400,
			chunkOverlap: 20,
			encodingName: 'cl100k_base',
		})

		const documentChunks = await splitter.splitDocuments([vectorDocument])

		/**
		 * @type {import('langchain/document').Document[]}
		 */
		const modifiedChunks = []

		documentChunks.forEach((chunk, i) => {
			modifiedChunks.push(
				new Document({
					pageContent: chunk.pageContent,
					metadata: {
						source: chunk.metadata.source,
						document_id: chunk.metadata.document_id,
						chunk_id: `${chunk.metadata.document_id}-${i}`,
					},
				})
			)
		})

		return modifiedChunks
	} catch (error) {
		throw error
	}
}

export default loadAndSplit
