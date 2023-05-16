import twitterClient from '../../../utils/api/twitter.js'

import authFinderAndUpdater from '../../lifecycle/authFinderOrUpdater.js'
import userFinderAndUpdater from '../../lifecycle/userFinderOrUpdater.js'

/**
 * A function that handles callbacks for Twitter
 *
 * @param {String} state
 * @param {String} code
 * @param {import('../../../utils/types/authObject.js').authObject} authObject
 */
const twitterCallback = async (
	state,
	code,
	{ codeVerifier, state: sessionState, profile_id }
) => {
	try {
		if (!codeVerifier || !state || !sessionState || !code)
			throw new Error('You denied the app or your session expired!')

		if (state !== sessionState)
			throw new Error("Stored tokens didn't match!")

		const { client, refreshToken, accessToken } =
			await twitterClient.loginWithOAuth2({
				code,
				codeVerifier,
				redirectUri: `${process.env.HOST}/auth/callback/twitter`,
			})

		const { data } = await client.v2.me()

		/**
		 * @type {import('../../../utils/types/userObject.js').userObject}
		 */
		let userObject = {
			personalDetails: {
				profile_id: profile_id,
				name: data.name,
			},
			authDetails: {
				twitter_id: data.id,
			},
			twitterTokens: {
				access_token: accessToken,
				refresh_token: refreshToken,
			},
		}

		const user = await userFinderAndUpdater(userObject)

		await authFinderAndUpdater(userObject)

		return user
	} catch (error) {
		throw error
	}
}

export default twitterCallback
