import randomstring from 'randomstring'
import snoowrap from 'snoowrap'

/**
 * A function to handle the 3-legged authentication for Reddit
 */
const redditAuthFlow = () => {
	try {
		const state = randomstring.generate(7)

		const url = snoowrap.getAuthUrl({
			clientId: process.env.REDDIT_ID,
			redirectUri: `${process.env.HOST}/auth/callback/reddit`,
			state: state,
			permanent: true,
			scope: ['identity', 'history', 'read'],
		})

		return { state, url }
	} catch (error) {
		throw error
	}
}

export default redditAuthFlow
