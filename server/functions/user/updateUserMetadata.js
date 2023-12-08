import mixpanel from '../../utils/api/mixpanel.js'
import { User } from '../../utils/initializers/prisma.js'

/**
 * A function that will update the user metadata object
 *
 * @param {String} profile_id
 * @param {import('../../utils/types/userMetadataObject.js').userMetadataObject} userMetadataObject
 */
const updateUserMetadata = async (profile_id, userMetadataObject) => {
	try {
		const updatedUserMetadata = await User.update({
			where: { profile_id: profile_id },
			data: { userMetadata: { update: userMetadataObject } },
			include: { userMetadata: true },
		})

		mixpanel.track('update_user_metadata', {
			distinct_id: profile_id,
		})

		return updatedUserMetadata
	} catch (error) {
		throw error
	}
}

export default updateUserMetadata
