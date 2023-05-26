import { User } from '../../utils/initializers/prisma.js'

/**
 * A function to create the user object
 *
 * @param {import('../../utils/types/userObject.js').userObject} userObject
 */
const createUser = async ({ authDetails, personalDetails }) => {
	try {
		const user = await User.create({
			data: {
				...personalDetails,
				auth: { create: authDetails },
			},
			include: { auth: true },
		})

		return user
	} catch (error) {
		throw error
	}
}

export default createUser
