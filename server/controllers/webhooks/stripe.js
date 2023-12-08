import subscriptionDelete from '../../functions/payment/subscriptionDelete.js'
import subscriptionUpdate from '../../functions/payment/subscriptionUpdate.js'

/**
 * A controller for the Stripe webhook
 *
 * @param {import("fastify/types/request").FastifyRequest} req
 * @param {import("fastify/types/reply").FastifyReply} res
 */
const stripe = async (req, res) => {
	try {
		const { data, type } = req.body

		if (
			type === 'invoice.payment_succeeded' &&
			data.object.status === 'paid'
		) {
			await subscriptionUpdate(data.object)
		} else if (
			type === 'customer.subscription.deleted' &&
			data.object.status === 'canceled'
		) {
			await subscriptionDelete(data.object)
		}

		return
	} catch (error) {
		throw error
	}
}

export default stripe
