import { User } from '../../utils/connections/postgreConnect.js'

import createUser from '../crud/user/profile/createUser.js'
import updateUser from '../crud/user/profile/updateUser.js'

/**
 * A function to check if the user exists or not and update them accordingly
 *
 * @param {import('../../utils/types/userObject.js').userObject} userObject
 */
const userFinderAndUpdater = async (userObject) => {
	try {
		const user = await User.findOne({
			where: { email: userObject.personalDetails.email },
		})

		if (!user) return await createUser(userObject)
		else return await updateUser(userObject)
	} catch (error) {
		throw error
	}
}

export default userFinderAndUpdater
