import { OpenAI } from 'langchain/llms/openai'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

export const model = new OpenAI({
	modelName: 'gpt-3.5-turbo',
	openAIApiKey: process.env.OPENAI_ID,
})

export const embeddings = new OpenAIEmbeddings({
	stripNewLines: false,
	openAIApiKey: process.env.OPENAI_ID,
	verbose: true,
})
