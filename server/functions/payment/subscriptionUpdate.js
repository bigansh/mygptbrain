import mixpanel from '../../utils/api/mixpanel.js'
import stripe from '../../utils/api/stripe.js'
import { User } from '../../utils/initializers/prisma.js'

/**
 * A function that will update the user in the database on successful payment
 *
 * @param {Object} stripeObject
 */
const subscriptionUpdate = async (stripeObject) => {
	try {
		const {
			customer: customer_id,
			customer_email,
			customer_name,
			id,
			payment_intent: payment_intent_id,
			subscription: subscription_id,
		} = stripeObject

		// const subscriptionDetails = await stripe.subscriptions.retrieve(
		// 	subscription_id
		// )

		const foundUser = await User.findFirst({
			where: { email: { equals: customer_email, mode: 'insensitive' } },
		})

		if (!foundUser) {
			throw new Error('User not found')
		}

		const user = await User.update({
			where: { email: customer_email, profile_id: foundUser.profile_id },
			data: {
				stripe_id: customer_id,
				userMetadata: { update: { subscription_status: true } },
			},
		})

		mixpanel.track('user_subscribed', {
			distinct_id: user.profile_id,
			stripe_id: customer_id,
			stripe_event_id: id,
			stripe_payment_id: payment_intent_id,
			stripe_subscription_id: subscription_id,
			stripe_customer_name: customer_name,
		})
		mixpanel.people.set(user.profile_id, {
			subscription_status: true,
			stripe_id: customer_id,
		})

		return
	} catch (error) {
		throw error
	}
}

export default subscriptionUpdate
