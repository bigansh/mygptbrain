import { PrismaVectorStore } from 'langchain/vectorstores/prisma'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { Prisma } from '@prisma/client'

import prisma from '../../utils/initializers/prisma'

/**
 * A function that creates the OpenAI embeddings of the chunks and stores them to the DB
 *
 * @param {import('langchain/document').Document[]} chunks
 */
const embedAndStore = async (chunks) => {
	try {
		const vectorStore = PrismaVectorStore.withModel(prisma).create(
			new OpenAIEmbeddings(),
			{
				prisma: Prisma,
				tableName: 'Vector',
				vectorColumnName: 'embeddings',
				columns: {
					id: PrismaVectorStore.IdColumn,
					content: PrismaVectorStore.ContentColumn,
				},
			}
		)

		await vectorStore.addModels(
			await prisma.$transaction(
				chunks.map((data) => prisma.vector.create({ data: { data } }))
			)
		)
	} catch (error) {
		throw error
	}
}

export default embedAndStore
