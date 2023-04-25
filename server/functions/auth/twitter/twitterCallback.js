import twitterClient from '../../../utils/api/twitter.js'

import authFinderAndUpdater from '../../lifecycle/authFinderOrUpdater.js'
import userFinderAndUpdater from '../../lifecycle/userFinderOrUpdater.js'

/**
 * A function that handles callbacks for Twitter
 *
 * @param {String} state
 * @param {String} code
 * @param {import('../../../utils/types/authObjects.js').authObjects} authObjects
 */
const twitterCallback = async (
	state,
	code,
	{ codeVerifier, sessionState, profile_id }
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
		const userObject = {
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

		await authFinderAndUpdater(userObject)

		const user = await userFinderAndUpdater(userObject)

		return user
	} catch (error) {
		throw error
	}
}

export default twitterCallback
