import { User } from '../../utils/connections/postgreConnect.js'

import createUser from '../crud/user/createUser.js'
import updateUser from '../crud/user/updateUser.js'

/**
 * A function to check if the user exists or and update them accordingly
 *
 * @param {*} userObject
 */
const userFinderAndUpdater = async (userObject) => {
	try {
		const user = await User.findOne({ where: { email: userObject.email } })

		if (!user) return await createUser(userObject)
		else return await updateUser(userObject)
	} catch (error) {
		throw error
	}
}

export default userFinderAndUpdater
