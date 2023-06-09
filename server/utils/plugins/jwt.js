import fastifyPlugin from 'fastify-plugin'
import fastifyJWT from '@fastify/jwt'

/**
 * A plugin that adds JWT authentication
 */
const jwt = fastifyPlugin(
	/**
	 * @param {import('fastify/fastify').FastifyInstance} fastify
	 * @param {import('fastify/fastify').FastifyPluginOptions} _options
	 * @param {import('fastify/fastify').DoneFuncWithErrOrRes} done
	 */
	(fastify, _options, done) => {
		fastify.register(fastifyJWT, {
			secret: process.env.JWT_AUTH,
		})

		done()
	}
)

export default jwt
