import randomstring from 'randomstring'
import axios from 'axios'

/**
 * A function to handle the 3-legged authentication for Pocket
 */
const pocketAuthFlow = async () => {
	try {
		const state = randomstring.generate(7)

		const requestToken = await axios.post(
			'https://getpocket.com/v3/oauth/request',
			{
				consumer_key: process.env.POCKET_ID,
				redirect_uri: `${process.env.HOST}/auth/callback/pocket`,
			},
			{
				headers: {
					'user-agent': 'myGPTBrain',
					'content-type': 'application/json; charset=UTF-8',
					'x-accept': 'application/json',
				},
			}
		)

		const url = `https://getpocket.com/auth/authorize?request_token=${requestToken.data.code}&redirect_uri=${process.env.HOST}/auth/callback/pocket?state=${state}`

		return { url, state, code: requestToken.data.code }
	} catch (error) {
		throw error
	}
}

export default pocketAuthFlow
