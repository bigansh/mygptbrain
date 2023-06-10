import randomstring from 'randomstring'

/**
 * A function that send the authorization URL for Notion
 */
const notionAuthFlow = () => {
	const state = randomstring.generate(7)

	const url = `https://api.notion.com/v1/oauth/authorize?client_id=${process.env.NOTION_ID}&response_type=code&owner=user&redirect_uri=${process.env.HOST}/auth/callback/notion&state=${state}`

	return { state, url }
}

export default notionAuthFlow
