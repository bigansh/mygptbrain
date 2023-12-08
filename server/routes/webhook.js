import stripe from '../controllers/webhooks/stripe.js'

/**
 * A route that handles webhook requests
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} _options
 * @param {import("fastify").DoneFuncWithErrOrRes} done
 */
const webhook = (fastify, _options, done) => {
	fastify.post('/stripe', stripe)

	done()
}

export default webhook
