/**
 * A controller for the Stripe webhook
 *
 * @param {import("fastify/types/request").FastifyRequest} req
 * @param {import("fastify/types/reply").FastifyReply} res
 */
const stripe = async (req, res) => {
	try {
		const { data, type } = req.body

		console.log(data.object.status, type)

		return

		if (type === 'customer.subscription.created') {
			console.log(data.object.status, type, 'hi')
		} else if (
			type ===
			('customer.subscription.paused' || 'customer.subscription.deleted')
		) {
			console.log(data.object)
		}
	} catch (error) {
		throw error
	}
}

export default stripe
