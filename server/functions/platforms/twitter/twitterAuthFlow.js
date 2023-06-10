import twitterClient from '../../../utils/api/twitter.js'

/**
 * A function to handle the 3-legged authentication for Twitter
 */
const twitterAuthFlow = () => {
	const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
		`${process.env.HOST}/auth/callback/twitter`,
		{
			scope: [
				'users.read',
				'bookmark.read',
				'bookmark.write',
				'offline.access',
				'tweet.read',
			],
		}
	)

	return { url, codeVerifier, state }
}

export default twitterAuthFlow
