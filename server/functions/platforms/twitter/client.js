import { TwitterApi } from 'twitter-api-v2'
import { TwitterApiAutoTokenRefresher } from '@twitter-api-v2/plugin-token-refresher'

import { Auth } from '../../../utils/initializers/prisma.js'

import twitterClient from '../../../utils/api/twitter.js'

/**
 * A function that returns the user client for Twitter
 *
 * @param {String} profile_id
 */
const client = async (profile_id) => {
	try {
		const { twitter_id, twitter } = await Auth.findUnique({
			where: { profile_id: profile_id },
			include: { twitter: true },
		})

		const access_token = twitter.access_token

		const tokenRefreshPlugin = new TwitterApiAutoTokenRefresher({
			refreshToken: twitter.refresh_token,
			refreshCredentials: twitterClient,

			onTokenUpdate({ accessToken, refreshToken }) {
				twitter.access_token = accessToken
				twitter.refresh_token = refreshToken
			},
			onTokenRefreshError(error) {
				throw error
			},
		})

		await Auth.update({
			data: { twitter: { update: twitter } },
			where: { profile_id: profile_id },
		})

		return new TwitterApi(access_token, { plugins: [tokenRefreshPlugin] })
	} catch (error) {
		throw error
	}
}

export default client
