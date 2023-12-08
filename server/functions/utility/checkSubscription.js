import { User } from '../../utils/initializers/prisma.js'

/**
 * A function that will check the subscription status of a user
 *
 * @param {String} profile_id
 */
const checkSubscription = async (profile_id) => {
	try {
		const user = await User.findFirst({
			where: { profile_id: profile_id },
			select: { userMetadata: true },
		})

		if (!user.userMetadata.subscription_status) {
			throw new Error('User is not authorized')
		}

		return user
	} catch (error) {
		throw error
	}
}

export default checkSubscription
