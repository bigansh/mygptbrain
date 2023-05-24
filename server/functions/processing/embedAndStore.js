import { PrismaVectorStore } from 'langchain/vectorstores/prisma'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { Prisma } from '@prisma/client'

import prisma from '../../utils/initializers/prisma.js'

export const vectorStore = PrismaVectorStore.withModel(prisma).create(
	new OpenAIEmbeddings({
		stripNewLines: false,
		openAIApiKey: process.env.OPENAI_ID,
		verbose: true,
	}),
	{
		prisma: Prisma,
		tableName: 'Vector',
		vectorColumnName: 'embedding',
		columns: {
			vector_id: PrismaVectorStore.IdColumn,
			chunk: PrismaVectorStore.ContentColumn,
		},
	}
)

/**
 * A function that creates the OpenAI embeddings of the chunks and stores them to the DB
 *
 * @param {import('langchain/document').Document[]} chunks
 */
const embedAndStore = async (chunks) => {
	try {
		await vectorStore.addModels(
			await prisma.$transaction(
				chunks.map((chunk) =>
					prisma.vector.create({
						data: { chunk: chunk.pageContent, ...chunk.metadata },
					})
				)
			)
		)
	} catch (error) {
		throw error
	}
}

export default embedAndStore
