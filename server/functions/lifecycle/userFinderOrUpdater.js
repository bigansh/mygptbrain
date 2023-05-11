import { User } from '../../utils/initializers/prisma.js'

import createUser from '../crud/user/profile/createUser.js'
import updateUser from '../crud/user/profile/updateUser.js'

/**
 * A function to check if the user exists or not and update them accordingly
 *
 * @param {import('../../utils/types/userObject.js').userObject} userObject
 */
const userFinderAndUpdater = async (userObject) => {
	try {
		let query = {}

		if (userObject.personalDetails.email)
			query = { ...query, email: userObject.personalDetails.email }
		else if (userObject.personalDetails.profile_id)
			query = {
				...query,
				profile_id: userObject.personalDetails.profile_id,
			}

		const user = await User.findUnique({
			where: query,
		})

		if (!user) return await createUser(userObject)
		else return await updateUser(userObject)
	} catch (error) {
		throw error
	}
}

export default userFinderAndUpdater
