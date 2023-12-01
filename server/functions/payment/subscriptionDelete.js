import mixpanel from '../../utils/api/mixpanel.js'
import stripe from '../../utils/api/stripe.js'
import { User } from '../../utils/initializers/prisma.js'

/**
 * A function that will set the subscription status to false
 */
const subscriptionDelete = async (stripeObject) => {
	try {
		const { customer: customer_id, id } = stripeObject

		const stripeCustomer = await stripe.customers.retrieve(customer_id)

		const foundUser = await User.findFirst({
			where: { stripe_id: customer_id },
		})

		if (stripeCustomer.email !== foundUser.email) {
			throw new Error('Customer profile mismatch')
		}

		const user = await User.update({
			where: { email: foundUser.email, stripe_id: foundUser.stripe_id },
			data: { userMetadata: { update: { subscription_status: false } } },
		})

		mixpanel.track('user_unsubscribed', {
			distinct_id: user.profile_id,
			stripe_id: customer_id,
			stripe_event_id: id,
			stripe_subscription_id: id,
			stripe_customer_name: stripeCustomer.name,
		})
		mixpanel.people.set(user.profile_id, {
			subscription_status: false,
		})

		return
	} catch (error) {
		throw error
	}
}

export default subscriptionDelete
