import cache from '../../utils/initializers/cache.js'

import twitterAuthFlow from '../../functions/platforms/twitter/twitterAuthFlow.js'
import googleAuthFlow from '../../functions/platforms/google/googleAuthFlow.js'
import pocketAuthFlow from '../../functions/platforms/pocket/pocketAuthFlow.js'
import signupAuthFlow from '../../functions/platforms/login/signupAuthFlow.js'
import loginAuthFlow from '../../functions/platforms/login/loginAuthFlow.js'

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
		 * @type {import('../../utils/types/authObject.js').authObject}
		 */
		let authObject

		if (query_type === 'twitter') {
			const { url, state, codeVerifier } = twitterAuthFlow()

			authObject = { state, codeVerifier, profile_id } || {}

			cache.set(state, authObject, 60 * 2)

			res.status(302).redirect(url)
		} else if (query_type === 'google') {
			const { state, url } = googleAuthFlow(query_type)

			authObject = { state, profile_id } || {}

			cache.set(state, authObject, 60 * 2)

			res.status(302).redirect(url)
		} else if (query_type === 'pocket') {
			const { state, url, code } = await pocketAuthFlow()

			authObject = { state, profile_id, code } || {}

			cache.set(state, authObject, 60 * 2)

			res.status(302).redirect(url)
		} else if (query_type === 'reddit') {
			const { state, url } = redditAuthFlow()

			authObject = { state, profile_id } || {}

			cache.set(state, authObject, 60 * 2)

			res.status(302).redirect(url)
		} else if (query_type === 'signup') {
			console.log(req.body);

			if (!req.body.userObject) throw new Error('User object missing.')

			// const { state, url } = signupAuthFlow(req.body.userObject)

			authObject = { state, profile_id } || {}

			cache.set(state, authObject, 60 * 2)

			res.status(302).redirect(url)
		} else if (query_type === 'login') {
			if (!req.body.userObject) throw new Error('User object missing.')

			const { state, url } = loginAuthFlow(req.body.userObject)

			authObject = { state, profile_id } || {}

			cache.set(state, authObject, 60 * 2)

			res.status(302).redirect(url)
		}
	} catch (error) {
		throw error
	}
}

export default initialize
