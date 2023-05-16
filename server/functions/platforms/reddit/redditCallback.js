import snoowrap from 'snoowrap'

import redditClient from '../../../utils/api/reddit.js'

import authFinderAndUpdater from '../../lifecycle/authFinderOrUpdater.js'
import userFinderAndUpdater from '../../lifecycle/userFinderOrUpdater.js'

/**
 * A function that handles callback request for Reddit
 *
 * @param {String} state
 * @param {String} code
 * @param {import('../../../utils/types/authObject.js').authObject} authObject
 */
const redditCallback = async (
	state,
	code,
	{ state: sessionState, profile_id }
) => {
	try {
		if (!state || !sessionState || !code)
			throw new Error('You denied the app or your session expired!')

		if (state !== sessionState)
			throw new Error("Stored tokens didn't match!")

		const client = await snoowrap.fromAuthCode({
			code: code,
			userAgent: 'myGPTBrain',
			clientId: process.env.REDDIT_ID,
			clientSecret: process.env.REDDIT_SECRET,
			redirectUri: `${process.env.HOST}/auth/callback/reddit`,
		})

		const redditUserClient = redditClient(client.refreshToken)

		const data = JSON.parse(JSON.stringify(await redditUserClient.getMe()))

		/**
		 * @type {import('../../../utils/types/userObject.js').userObject}
		 */
		const userObject = {
			personalDetails: {
				profile_id: profile_id,
			},
			authDetails: {
				reddit_id: data.id,
			},
			redditTokens: {
				access_token: client.accessToken,
				refresh_token: client.refreshToken,
			},
		}

		const user = await userFinderAndUpdater(userObject)

		await authFinderAndUpdater(userObject)

		return user
	} catch (error) {
		throw error
	}
}

export default redditCallback
