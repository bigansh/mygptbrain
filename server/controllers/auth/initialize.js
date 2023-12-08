import cache from '../../utils/initializers/cache.js'

import twitterAuthFlow from '../../functions/platforms/twitter/twitterAuthFlow.js'
import googleAuthFlow from '../../functions/platforms/google/googleAuthFlow.js'
import pocketAuthFlow from '../../functions/platforms/pocket/pocketAuthFlow.js'
import signupAuthFlow from '../../functions/platforms/login/signupAuthFlow.js'
import loginAuthFlow from '../../functions/platforms/login/loginAuthFlow.js'
import notionAuthFlow from '../../functions/platforms/notion/notionAuthFlow.js'
import redditAuthFlow from '../../functions/platforms/reddit/redditAuthFlow.js'
import checkSubscription from '../../functions/utility/checkSubscription.js'

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
			if (!profile_id) {
				throw new Error('No profile_id param found.')
			}

			await checkSubscription(profile_id)

			const { url, state, codeVerifier } = twitterAuthFlow()

			authObject = { state, codeVerifier, profile_id } || {}

			cache.set(state, authObject, 60 * 2)

			res.status(302).redirect(url)
		} else if (
			query_type === 'google' ||
			query_type === 'keep' ||
			query_type === 'drive'
		) {
			if (
				profile_id &&
				(query_type === 'keep' || query_type === 'drive')
			) {
				await checkSubscription(profile_id)
			}

			const { state, url, authenticatedScopes } =
				googleAuthFlow(query_type)

			authObject = { state, profile_id, authenticatedScopes } || {}

			cache.set(state, authObject, 60 * 2)

			res.status(302).redirect(url)
		} else if (query_type === 'pocket') {
			if (!profile_id) {
				throw new Error('No profile_id param found.')
			}

			await checkSubscription(profile_id)

			const { state, url, code } = await pocketAuthFlow()

			authObject = { state, profile_id, code } || {}

			cache.set(state, authObject, 60 * 2)

			res.status(302).redirect(url)
		} else if (query_type === 'reddit') {
			if (!profile_id) {
				throw new Error('No profile_id param found.')
			}

			await checkSubscription(profile_id)

			const { state, url } = redditAuthFlow()

			authObject = { state, profile_id } || {}

			cache.set(state, authObject, 60 * 2)

			res.status(302).redirect(url)
		} else if (query_type === 'notion') {
			if (!profile_id) {
				throw new Error('No profile_id param found.')
			}

			await checkSubscription(profile_id)

			const { state, url } = notionAuthFlow()

			authObject = { state, profile_id } || {}

			cache.set(state, authObject, 60 * 2)

			res.status(302).redirect(url)
		} else if (query_type === 'signup') {
			if (!req.body.userObject) {
				throw new Error('User object missing.')
			}

			const { profile_id } = await signupAuthFlow(req.body.userObject)

			const sessionToken = await res.jwtSign({ profile_id })

			res.status(200).send({ sessionToken: sessionToken })
		} else if (query_type === 'login') {
			if (!req.body.userObject) {
				throw new Error('User object missing.')
			}

			const { profile_id } = await loginAuthFlow(req.body.userObject)

			const sessionToken = await res.jwtSign({ profile_id })

			res.status(200).send({ sessionToken: sessionToken })
		}
	} catch (error) {
		throw error
	}
}

export default initialize
