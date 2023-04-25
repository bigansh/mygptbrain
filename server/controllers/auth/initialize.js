import cache from '../../utils/initializers/cache.js'

import twitterAuthFlow from '../../functions/auth/twitter/twitterAuthFlow.js'

/**
 * A controller to handle the auth initialization requests
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const initialize = async (req, res) => {
	try {
		const { query_type, profile_id } = req.query

		if (query_type === 'twitter') {
			const { url, state, codeVerifier } = twitterAuthFlow()

			const authObjects = { state, codeVerifier, profile_id } || {}

			cache.set(state, authObjects, 60 * 2)

			res.status(302).redirect(url)
		} else if (query_type === 'google') {
			
		}
	} catch (error) {
		throw error
	}
}

export default initialize
