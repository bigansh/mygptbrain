import { Auth } from '../../utils/initializers/prisma.js'

/**
 * A function that finds all the platforms a user has authorized
 *
 * @param {String} profile_id
 */
const authFinder = async (profile_id) => {
	try {
		const userAuth = await Auth.findUnique({
			where: { profile_id: profile_id },
			include: { google: true },
		})

		if (!userAuth) throw new Error('No such user exists')

		return userAuth
	} catch (error) {
		throw error
	}
}

export default authFinder
