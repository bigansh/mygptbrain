import { Client } from '@notionhq/client'

const notionClient = new Client({
	agent: 'myGPTBrain',
	auth: process.env.NOTION_TOKEN,
})

export default notionClient
