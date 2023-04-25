import * as dotenv from 'dotenv'

dotenv.config()

import fastifyPlugin from 'fastify-plugin'

/**
 * A plugin that authenticates if the client is authorized
 */
const clientAuth = fastifyPlugin(
	/**
	 *
	 * @param {import('fastify/fastify').FastifyInstance} fastify
	 * @param {import('fastify/fastify').RouteOptions} _options
	 * @param {import('fastify/fastify').DoneFuncWithErrOrRes} done
	 */
	(fastify, _options, done) => {
		fastify.decorate(
			'clientAuth',
			/**
			 * @param {import('fastify/fastify').FastifyRequest} req
			 * @param {import('fastify/fastify').FastifyReply} res
			 */
			(req, res, next) => {
				try {
					if (
						!req.query['authorization'] &&
						!req.headers['authorization']
					)
						throw new Error('Client authentication required.')

					const authToken =
						req.query['authorization'] ||
						req.headers['authorization'].split(' ')[1]

					if (authToken === process.env.STATIC_AUTH) next()
					else
						throw new Error(
							'Client not authorized to access this route.'
						)
				} catch (error) {
					throw error
				}
			}
		)

		done()
	}
)

export default clientAuth
