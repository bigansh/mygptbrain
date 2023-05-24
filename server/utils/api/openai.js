import { OpenAI } from 'langchain/llms/openai'

/**
 * A function that returns a client for OpenAI
 */
const openaiClient = () => {
	return new OpenAI({
		modelName: 'gpt-3.5-turbo',
		openAIApiKey: process.env.OPENAI_ID,
	})
}

export default openaiClient