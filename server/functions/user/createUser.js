import mixpanel from '../../utils/api/mixpanel.js'
import stripe from '../../utils/api/stripe.js'
import { User } from '../../utils/initializers/prisma.js'

/**
 * A function to create the user object
 *
 * @param {import('../../utils/types/userObject.js').userObject} userObject
 */
const createUser = async ({ authDetails, personalDetails }) => {
	try {
		const user = await User.create({
			data: {
				...personalDetails,
				auth: { create: authDetails },
				userMetadata: { create: {} },
			},
			include: { auth: true },
		})

		const stripeProfile = await stripe.customers.create({
			name: user.name,
			email: user.email,
			metadata: {
				profile_id: user.profile_id,
			},
		})

		mixpanel.people.set(user.profile_id, {
			$name: user.name,
			$email: user.email,
			subscription_status: false,
			stripe_id: stripeProfile.id,
		})

		mixpanel.track('signup', {
			distinct_id: user.profile_id,
		})

		return user
	} catch (error) {
		throw error
	}
}

export default createUser
