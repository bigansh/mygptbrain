import { Cohere } from 'langchain/llms/cohere'

export const cohere = new Cohere({
	apiKey: process.env.COHERE_ID,
    temperature: 0
})
