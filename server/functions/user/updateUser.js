import mixpanel from '../../utils/api/mixpanel.js'
import { User } from '../../utils/initializers/prisma.js'

/**
 * A function to update the user and the corresponding objects
 *
 * @param {import('../../utils/types/userObject.js').userObject} userObject
 * @param {String} profile_id
 */
const updateUser = async ({ personalDetails }, profile_id) => {
	try {
		const user = await User.update({
			data: personalDetails,
			where: { profile_id: profile_id || personalDetails.profile_id },
		})

		mixpanel.people.set(user.profile_id, {
			$name: user.name,
			$email: user.email,
		})

		mixpanel.track('update_user', {
			distinct_id: user.profile_id,
		})

		return user
	} catch (error) {
		throw error
	}
}

export default updateUser
