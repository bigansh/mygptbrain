import {
	Auth,
	Google,
	Pocket,
	Reddit,
	Twitter,
} from '../../../../utils/initializers/prisma.js'

/**
 * A function to create the auth object of a user
 *
 * @param {import('../../../../utils/types/userObject.js').userObject} userObject
 */
const createAuth = async ({
	authDetails,
	personalDetails,
	googleTokens,
	twitterTokens,
	pocketTokens,
	redditTokens,
}) => {
	try {
		await Auth.update(
			{ data: authDetails },
			{
				where: { profile_id: personalDetails.profile_id },
			}
		)

		if (authDetails.google_id)
			await Google.create({
				data: { google_id: authDetails.google_id, ...googleTokens },
			})
		else if (authDetails.twitter_id)
			await Twitter.create({
				data: { twitter_id: authDetails.twitter_id, ...twitterTokens },
			})
		else if (authDetails.pocket_id)
			await Pocket.create({
				data: { pocket_id: authDetails.pocket_id, ...pocketTokens },
			})
		else if (authDetails.reddit_id)
			await Reddit.create({
				data: { reddit_id: authDetails.reddit_id, ...redditTokens },
			})
	} catch (error) {
		throw error
	}
}

export default createAuth
