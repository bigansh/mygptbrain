import { User } from '../../utils/initializers/prisma.js'

/**
 * Function to find the user profile
 *
 * @param {import('../../utils/types/userObject.js').userObject} userObject
 */
const findUser = async ({ personalDetails }) => {
	try {
		return await User.findUnique({
			where: personalDetails,
			include: { auth: { include: { google: true } } },
			cacheStrategy: { ttl: 60 },
		})
	} catch (error) {
		throw error
	}
}

export default findUser
