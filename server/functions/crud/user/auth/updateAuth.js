import {
	Auth,
	Google,
	Pocket,
	Reddit,
	Twitter,
} from '../../../../utils/connections/postgreConnect.js'

/**
 * A function to create the auth object of a user
 *
 * @param {import('../../../../utils/types/userObject.js').userObject} userObject
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
			await Google.update(googleTokens, {
				where: { google_id: authDetails.google_id },
			})
		else if (authDetails.twitter_id)
			await Twitter.update(twitterTokens, {
				where: { twitter_id: authDetails.twitter_id },
			})
		else if (authDetails.pocket_id)
			await Pocket.update(pocketTokens, {
				where: { pocket_id: authDetails.pocket_id },
			})
		else if (authDetails.reddit_id)
			await Reddit.update(redditTokens, {
				where: { reddit_id: authDetails.reddit_id },
			})
	} catch (error) {
		throw error
	}
}

export default updateAuth
