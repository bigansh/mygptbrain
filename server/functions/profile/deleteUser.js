import { User } from '../../utils/initializers/prisma'

/**
 * A function to delete a particular user
 *
 * @param {String} profile_id
 */
const deleteUser = async (profile_id) => {
	try {
		return await User.delete({ where: { profile_id: profile_id } })
	} catch (error) {
		throw error
	}
}

export default deleteUser
