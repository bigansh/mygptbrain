import bcrypt from 'bcrypt'

import {
	Auth,
	Google,
	Pocket,
	Reddit,
	Twitter,
} from '../../utils/initializers/prisma.js'

/**
 * A function to create the auth object of a user
 *
 * @param {import('../../utils/types/userObject.js').userObject} userObject
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
		if (authDetails.google_id) {
			return await Google.update({
				data: googleTokens,
				where: { google_id: authDetails.google_id },
				include: { auth: true },
			})
		} else if (authDetails.twitter_id) {
			return await Twitter.update({
				data: twitterTokens,
				where: { twitter_id: authDetails.twitter_id },
				include: { auth: true },
			})
		} else if (authDetails.pocket_id) {
			return await Pocket.update({
				data: pocketTokens,
				where: { pocket_id: authDetails.pocket_id },
				include: { auth: true },
			})
		} else if (authDetails.reddit_id) {
			return await Reddit.update({
				data: redditTokens,
				where: { reddit_id: authDetails.reddit_id },
				include: { auth: true },
			})
		} else if (authDetails.password) {
			const hash = await bcrypt.hash(userObject.authDetails.password, 10)

			authDetails.password_salt = hash
			authDetails.password = null

			return await Auth.update({
				data: authDetails,
				where: { profile_id: personalDetails.profile_id },
			})
		}
	} catch (error) {
		throw error
	}
}

export default updateAuth
