import {
	Auth,
	Google,
	Pocket,
	Reddit,
	Twitter,
} from '../../../utils/initializers/prisma.js'

/**
 * A function to create the auth object of a user
 *
 * @param {import('../../../utils/types/userObject.js').userObject} userObject
 */
const updateAuth = async ({
	authDetails,
	personalDetails,
	googleTokens,
	twitterTokens,
	pocketTokens,
	redditTokens,
}) => {
	try {
		if (authDetails.google_id)
			await Google.update({
				data: googleTokens,
				where: { google_id: authDetails.google_id },
			})
		else if (authDetails.twitter_id)
			await Twitter.update({
				data: twitterTokens,
				where: { twitter_id: authDetails.twitter_id },
			})
		else if (authDetails.pocket_id)
			await Pocket.update({
				data: pocketTokens,
				where: { pocket_id: authDetails.pocket_id },
			})
		else if (authDetails.reddit_id)
			await Reddit.update({
				data: redditTokens,
				where: { reddit_id: authDetails.reddit_id },
			})
	} catch (error) {
		throw error
	}
}

export default updateAuth
