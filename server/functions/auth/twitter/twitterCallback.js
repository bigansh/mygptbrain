import twitterClient from '../../../utils/api/twitter.js'

import updateUser from '../../crud/user/updateUser.js'

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

		const userObject = {
			profile_id: profile_id,
			name: data.name,
			twitter_id: data.id,
			twitter_auth_tokens: {
				access_token: accessToken,
				refresh_token: refreshToken,
			},
		}

		const user = await updateUser(userObject)

		return user
	} catch (error) {
		throw error
	}
}

export default twitterCallback
