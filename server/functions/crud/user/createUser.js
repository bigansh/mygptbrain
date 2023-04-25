import { UUIDV4 } from 'sequelize'

import { User } from '../../../utils/connections/postgreConnect.js'

/**
 * A function to create the user object
 */
const createUser = async (userObject) => {
	try {
		const userObject = { ...userObject, profile_id: UUIDV4() }

		const user = await User.create(userObject)

		return user
	} catch (error) {
		throw error
	}
}

export default createUser
