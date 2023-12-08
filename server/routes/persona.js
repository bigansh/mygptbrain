import chat from '../controllers/persona/chat.js'

/**
 * A route that handles persona requests
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} _options
 * @param {import("fastify").DoneFuncWithErrOrRes} done
 */
const persona = (fastify, _options, done) => {
	fastify.post(
		'/chat',
		{
			preHandler: fastify.rateLimit({
				max: 5,
				timeWindow: 1000 * 60,
			}),
			onRequest: [fastify.clientAuth],
		},
		chat
	)

	done()
}

export default persona
