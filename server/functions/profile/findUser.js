import { User } from '../../utils/initializers/prisma'

/**
 * Function to find the user profile
 *
 * @param {import('../../utils/types/userObject').userObject} userObject
 */
const findUser = async ({ personalDetails }) => {
	try {
		return await User.findUnique({
			where: { profile_id: profile_id },
			include: { auth: true },
		})
	} catch (error) {
		throw error
	}
}

export default findUser