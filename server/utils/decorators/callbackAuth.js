import fastifyPlugin from 'fastify-plugin'

/**
 * A decorator that checks for the auth callback types
 */
const callbackAuth = fastifyPlugin(
	/**
	 * @param {import('fastify').FastifyInstance} fastify
	 * @param {import('fastify').RouteOptions} _options
	 * @param {import('fastify').DoneFuncWithErrOrRes} done
	 */
	(fastify, _options, done) => {
		fastify.decorate(
			'callbackAuth',
			/**
			 * @param {import('fastify/fastify').FastifyRequest} req
			 * @param {import('fastify/fastify').FastifyReply} res
			 * @param {import('fastify').DoneFuncWithErrOrRes} done
			 */
			(req, res, done) => {
				try {
					if (!req.params.platform) {
						throw new Error('Undefined callback platform.')
					} else if (
						![
							'twitter',
							'reddit',
							'google',
							'notion',
							'pocket',
							'microsoft',
						].some((platform) => platform === req.params.platform)
					) {
						throw new Error('Unsupported auth platform.')
					}

					done()
				} catch (error) {
					throw error
				}
			}
		)

		done()
	}
)

export default callbackAuth
