import read from '../controllers/document/read.js'
import create from '../controllers/document/create.js'

/**
 * A route that handles document requests
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} _options
 * @param {import("fastify").DoneFuncWithErrOrRes} done
 */
const document = (fastify, _options, done) => {
	fastify.post(
		'/create',
		{
			onRequest: [fastify.userAuth],
		},
		create
	)
	fastify.get(
		'/read',
		{
			onRequest: [fastify.userAuth],
		},
		read
	)

	done()
}

export default document
