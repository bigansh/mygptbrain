import * as dotenv from 'dotenv'

dotenv.config()

import fastifyPlugin from 'fastify-plugin'
import fastifyJWT from '@fastify/jwt'

/**
 * A plugin that adds JWT authentication
 */
const jwt = fastifyPlugin(
	/**
	 * @param {import('fastify/fastify').FastifyInstance} fastify
	 * @param {import('fastify/fastify').FastifyPluginOptions} _options
	 */
	async (fastify, _options) => {
		fastify.register(fastifyJWT, {
			secret: process.env.JWT_AUTH,
		})
	}
)

export default jwt
