import { PGVectorStore } from 'langchain/vectorstores/pgvector'

import { embeddings } from './openai.js'

export const vectorStore = await PGVectorStore.initialize(embeddings, {
	tableName: 'embeddings',
	columns: {
		idColumnName: 'id',
		vectorColumnName: 'vectors',
		metadataColumnName: 'metadata',
		contentColumnName: 'content',
	},
	postgresConnectionOptions: {
		connectionString: process.env.SUPABASESQL,
	},
})
