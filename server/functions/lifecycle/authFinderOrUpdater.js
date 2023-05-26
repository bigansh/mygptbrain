import {
	Google,
	Reddit,
	Pocket,
	Twitter,
	Auth,
} from '../../utils/initializers/prisma.js'

import createAuth from '../auth/createAuth.js'
import updateAuth from '../auth/updateAuth.js'

/**
 * A function to check if the a user platform auth exists or not and update them accordingly
 *
 * @param {import('../../utils/types/userObject.js').userObject} userObject
 */
const authFinderAndUpdater = async (userObject) => {
	try {
		let foundUser

		if (userObject.authDetails.google_id) {
			foundUser = await Google.findUnique({
				where: { google_id: userObject.authDetails.google_id },
			})
		} else if (userObject.authDetails.pocket_id) {
			foundUser = await Pocket.findUnique({
				where: { pocket_id: userObject.authDetails.pocket_id },
			})
		} else if (userObject.authDetails.twitter_id) {
			foundUser = await Twitter.findUnique({
				where: { twitter_id: userObject.authDetails.twitter_id },
			})
		} else if (userObject.authDetails.reddit_id) {
			foundUser = await Reddit.findUnique({
				where: { reddit_id: userObject.authDetails.reddit_id },
			})
		} else if (userObject.authDetails.password) {
			foundUser = await Auth.findUnique({
				where: { profile_id: userObject.personalDetails.profile_id },
			})
		}

		if (!foundUser) return await createAuth(userObject)
		else return await updateAuth(userObject)
	} catch (error) {
		throw error
	}
}

export default authFinderAndUpdater
