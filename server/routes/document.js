import create from '../controllers/document/create.js'

/**
 * A route that handles crud requests
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} _options
 * @param {import("fastify").DoneFuncWithErrOrRes} done
 */
const document = (fastify, _options, done) => {
	fastify.post(
		'/create',
		{
			// onRequest: [fastify.userAuth],
		},
		create
	)

	done()
}

export default document
