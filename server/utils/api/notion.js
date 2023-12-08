import { Client } from '@notionhq/client'

const notionClient = new Client({
	auth: process.env.NOTION_ID,
})

export default notionClient

const encoded = Buffer.from(
	`${process.env.NOTION_ID}:${process.env.NOTION_SECRET}`
).toString('base64')

export const notionAuthorizationClient = (code) => {
	return {
		data: JSON.stringify({
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: `${process.env.HOST}/auth/callback/notion`,
		}),

		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Basic ${encoded}`,
			'user-agent': 'myGPTBrain',
		},
	}
}
