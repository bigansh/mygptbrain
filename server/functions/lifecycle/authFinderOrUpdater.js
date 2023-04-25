import {
	User,
	Auth,
	Google,
	Reddit,
	Pocket,
	Twitter,
} from '../../utils/connections/postgreConnect.js'

import createAuth from '../crud/user/auth/createAuth.js'
import updateAuth from '../crud/user/auth/updateAuth.js'

/**
 * A function to check if the a user platform auth exists or not and update them accordingly
 *
 * @param {import('../../utils/types/userObject.js').userObject} userObject
 */
const authFinderAndUpdater = async (userObject) => {
	try {
		let query = {}

		let user

		if (userObject.authDetails.google_id)
			user = await Google.findOne({
				where: { google_id: userObject.authDetails.google_id },
			})
		else if (userObject.authDetails.pocket_id)
			user = await Pocket.findOne({
				where: { pocket_id: userObject.authDetails.pocket_id },
			})
		else if (userObject.authDetails.twitter_id)
			user = await Twitter.findOne({
				where: { twitter_id: userObject.authDetails.twitter_id },
			})
		else if (userObject.authDetails.reddit_id)
			user = await Reddit.findOne({
				where: { reddit_id: userObject.authDetails.reddit_id },
			})

		if (!user) return await createAuth(userObject)
		else return await updateAuth(userObject)
	} catch (error) {
		throw error
	}
}

export default authFinderAndUpdater
