import { Document } from 'langchain/document'
import { TokenTextSplitter } from 'langchain/text_splitter'

export default async (jsonData) => {
	try {
		const vectorDocument = new Document({
			pageContent: jsonData.content,
			metadata: {
				source: jsonData.url,
				title: jsonData.title,
				author: jsonData.author,
				// date: jsonData.date,
				id: jsonData.id,
			},
		})

		return vectorDocument

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
						chunk_source: chunk.metadata.source,
						id: chunk.metadata.id,
						title: jsonData.title,
						author: jsonData.author,
						// date: jsonData.date,
						vector_id: `${chunk.metadata.id}-${i}`,
					},
				})
			)
		})

		return modifiedChunks
	} catch (error) {
		throw error
	}
}
