import mixpanel from '../../utils/api/mixpanel.js'
import pineconeIndex from '../../utils/api/pinecone.js'
import { User } from '../../utils/initializers/prisma.js'

/**
 * A function to delete a particular user
 *
 * @param {String} profile_id
 */
const deleteUser = async (profile_id) => {
	try {
		await User.delete({ where: { profile_id: profile_id } })

		await pineconeIndex._deleteMany({
			deleteRequest: {
				filter: {
					profile_id: profile_id,
				},
			},
		})

		mixpanel.people.delete_user(profile_id)

		return {
			accountDeleted: true,
		}
	} catch (error) {
		throw error
	}
}

export default deleteUser
