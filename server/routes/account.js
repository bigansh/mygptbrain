import del from '../controllers/account/del.js'
import read from '../controllers/account/read.js'
import update from '../controllers/account/update.js'

/**
 * A route that handles document requests
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} _options
 * @param {import("fastify").DoneFuncWithErrOrRes} done
 */
const account = (fastify, _options, done) => {
	fastify.get(
		'/read',
		{
			onRequest: [fastify.userAuth],
		},
		read
	)
	fastify.patch(
		'/update',
		{
			onRequest: [fastify.userAuth],
		},
		update
	)
	fastify.delete(
		'/delete',
		{
			onRequest: [fastify.userAuth],
		},
		del
	)

	done()
}

export default account
