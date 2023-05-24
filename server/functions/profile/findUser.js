import { User } from '../../utils/initializers/prisma'

/**
 * Function to find the user profile
 *
 * @param {String} profile_id
 */
const findUser = async (profile_id) => {
	try {
		return await User.findUnique({ where: { profile_id: profile_id } })
	} catch (error) {
		throw error
	}
}

export default findUser
