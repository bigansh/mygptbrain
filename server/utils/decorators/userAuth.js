import * as dotenv from 'dotenv'

dotenv.config()

import fastifyPlugin from 'fastify-plugin'

/**
 * A decorator that authenticates if the user is authorized
 */
const userAuth = fastifyPlugin(
	/**
	 *
	 * @param {import('fastify/fastify').FastifyInstance} fastify
	 * @param {import('fastify/fastify').RouteOptions} _options
	 */
	async (fastify, _options) => {
		fastify.decorate(
			'userAuth',
			/**
			 * @param {import('fastify/fastify').FastifyRequest} req
			 * @param {import('fastify/fastify').FastifyReply} res
			 */
			async (req, res) => {
				try {
					await req.jwtVerify()
				} catch (error) {
					throw error
				}
			}
		)
	}
)

export default userAuth
