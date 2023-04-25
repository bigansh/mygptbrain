import { User, Auth } from '../../utils/connections/postgreConnect.js'

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

		if (userObject.authDetails.google_id)
			query = { ...query, google_id: userObject.authDetails.google_id }
		else if (userObject.authDetails.pocket_id)
			query = { ...query, pocket_id: userObject.authDetails.pocket_id }
		else if (userObject.authDetails.twitter_id)
			query = { ...query, twitter_id: userObject.authDetails.twitter_id }
		else if (userObject.authDetails.reddit_id)
			query = { ...query, reddit_id: userObject.authDetails.reddit_id }

		const user = await Auth.findOne({
			where: query,
		})

		if (!user) return await createAuth(userObject)
		else return await updateAuth(userObject)
	} catch (error) {
		throw error
	}
}

export default authFinderAndUpdater
