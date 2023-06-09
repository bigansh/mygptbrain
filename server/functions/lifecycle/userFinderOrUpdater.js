import mixpanel from '../../utils/api/mixpanel.js'
import { User } from '../../utils/initializers/prisma.js'

import createUser from '../user/createUser.js'
import updateUser from '../user/updateUser.js'

/**
 * A function to check if the user exists or not and update them accordingly
 *
 * @param {import('../../utils/types/userObject.js').userObject} userObject
 */
const userFinderAndUpdater = async (userObject) => {
	try {
		let query = {}

		if (userObject.personalDetails.email) {
			query = {
				...query,
				email: userObject.personalDetails.email,
			}
		} else if (userObject.personalDetails.profile_id) {
			query = {
				...query,
				profile_id: userObject.personalDetails.profile_id,
			}
		}

		const user = await User.findUnique({
			where: query,
		})

		user && (userObject.personalDetails.profile_id = user.profile_id)

		if (!user) {
			const createdUser = await createUser(userObject)

			mixpanel.track('signup', {
				distinct_id: createdUser.profile_id,
			})

			return createdUser
		} else {
			const updatedUser = await updateUser(userObject)

			return updatedUser
		}
	} catch (error) {
		throw error
	}
}

export default userFinderAndUpdater
