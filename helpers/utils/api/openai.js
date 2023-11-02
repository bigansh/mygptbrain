import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

export const embeddings = new OpenAIEmbeddings({
	stripNewLines: false,
	openAIApiKey: process.env.OPENAI_ID,
	verbose: true,
})
