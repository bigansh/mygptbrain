import mixpanel from '../../utils/api/mixpanel.js'
import pineconeIndex from '../../utils/api/pinecone.js'
import stripe from '../../utils/api/stripe.js'
import { User } from '../../utils/initializers/prisma.js'

/**
 * A function to delete a particular user
 *
 * @param {String} profile_id
 */
const deleteUser = async (profile_id) => {
	try {
		const user = await User.delete({ where: { profile_id: profile_id } })

		if (user.stripe_id) {
			await stripe.customers.del(user.stripe_id)
		}

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
