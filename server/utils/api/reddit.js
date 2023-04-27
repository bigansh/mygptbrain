import snoowrap from 'snoowrap'

/**
 * A function that returns an optional Reddit client of a user
 *
 * @param {String} refreshToken
 */
const redditClient = (refreshToken = undefined) => {
	return new snoowrap({
		userAgent: 'myGPTBrain',
		clientId: process.env.REDDIT_ID,
		clientSecret: process.env.REDDIT_SECRET,
		refreshToken: refreshToken,
	})
}

export default redditClient
