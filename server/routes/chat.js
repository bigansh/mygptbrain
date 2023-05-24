import create from '../controllers/chat/create.js'
import del from '../controllers/chat/del.js'
import update from '../controllers/chat/update.js'
import query from '../controllers/chat/query.js'
import read from '../controllers/chat/read.js'

/**
 * A route that handles chat requests
 *
 * @param {import("fastify").FastifyInstance} fastify
 * @param {import("fastify").FastifyPluginOptions} _options
 * @param {import("fastify").DoneFuncWithErrOrRes} done
 */
const chat = (fastify, _options, done) => {
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
	fastify.patch(
		'/update',
		{
			onRequest: [fastify.userAuth],
		},
		update
	)
	fastify.patch(
		'/query',
		{
			onRequest: [fastify.userAuth],
		},
		query
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

export default chat
