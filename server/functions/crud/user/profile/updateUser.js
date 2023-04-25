import { User } from '../../../../utils/connections/postgreConnect.js'

/**
 * A function to update the user and the corresponding objects
 *
 * @param {import('../../../utils/types/userObject.js').userObject} userObject
 */
const updateUser = async (userObject) => {
	try {
		const user = await User.update(userObject.personalDetails, {
			where: { profile_id: userObject.personalDetails.profile_id },
		})

		return user
	} catch (error) {
		throw error
	}
}

export default updateUser
