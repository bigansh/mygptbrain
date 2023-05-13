import cache from '../../utils/initializers/cache.js'

import twitterAuthFlow from '../../functions/platforms/twitter/twitterAuthFlow.js'
import googleAuthFlow from '../../functions/platforms/google/googleAuthFlow.js'
import pocketAuthFlow from '../../functions/platforms/pocket/pocketAuthFlow.js'

/**
 * A controller to handle the auth initialization requests
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const initialize = async (req, res) => {
	try {
		const { query_type, profile_id } = req.query

		/**
		 * @type {import('../../utils/types/authObjects.js').authObjects}
		 */
		let authObjects

		if (query_type === 'twitter') {
			const { url, state, codeVerifier } = twitterAuthFlow()

			authObjects = { state, codeVerifier, profile_id } || {}

			cache.set(state, authObjects, 60 * 2)

			res.status(302).redirect(url)
		} else if (query_type === 'google') {
			const { state, url } = googleAuthFlow(query_type)

			authObjects = { state, profile_id } || {}

			cache.set(state, authObjects, 60 * 2)

			res.status(302).redirect(url)
		} else if (query_type === 'pocket') {
			const { state, url, code } = await pocketAuthFlow()

			authObjects = { state, profile_id, code } || {}

			cache.set(state, authObjects, 60 * 2)

			res.status(302).redirect(url)
		} else if (query_type === 'reddit') {
			const { state, url } = redditAuthFlow()

			const authObjects = { state, profile_id } || {}

			cache.set(state, authObjects, 60 * 2)

			res.status(302).redirect(url)
		}
	} catch (error) {
		throw error
	}
}

export default initialize
