import { User } from '../../../../utils/connections/postgreConnect.js'

/**
 * A function to update the user and the corresponding objects
 *
 * @param {import('../../../../utils/types/userObject.js').userObject} userObject
 */
const updateUser = async ({ personalDetails }) => {
	try {
		const user = await User.update(personalDetails, {
			where: { profile_id: personalDetails.profile_id },
		})

		return user
	} catch (error) {
		throw error
	}
}

export default updateUser
