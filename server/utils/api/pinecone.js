import { Pinecone } from '@pinecone-database/pinecone'

const client = new Pinecone({
	apiKey: process.env.PINECONE_ID,
	environment: process.env.PINECONE_ENVIRONMENT,
})

const pineconeIndex = client.Index(process.env.PINECONE_INDEX)

export default pineconeIndex
