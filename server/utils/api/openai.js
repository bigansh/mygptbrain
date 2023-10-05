import { OpenAI } from 'langchain/llms/openai'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

export const gpt_turbo = new OpenAI({
	modelName: 'gpt-3.5-turbo',
	openAIApiKey: process.env.OPENAI_ID,
	temperature: 0,
})

export const gpt_4 = new OpenAI({
	modelName: 'gpt-4',
	openAIApiKey: process.env.OPENAI_ID,
	temperature: 0,
})

export const embeddings = new OpenAIEmbeddings({
	stripNewLines: false,
	openAIApiKey: process.env.OPENAI_ID,
	verbose: true,
})
