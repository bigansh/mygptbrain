import { User } from '../../../utils/connections/postgreConnect.js'

/**
 * A function to update the user object
 */
const updateUser = async (userObject) => {
	try {
		const user = await User.update(userObject, {
			where: { profile_id: profile_id },
		})

        return user
	} catch (error) {
		throw error
	}
}

export default updateUser
