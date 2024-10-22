import cache from '../../utils/initializers/cache.js'

import twitterCallback from '../../functions/platforms/twitter/twitterCallback.js'
import googleCallback from '../../functions/platforms/google/googleCallback.js'
import pocketCallback from '../../functions/platforms/pocket/pocketCallback.js'
import notionCallback from '../../functions/platforms/notion/notionCallback.js'
import redditCallback from '../../functions/platforms/reddit/redditCallback.js'

/**
 * A controller to handle the auth callback requests
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const callback = async (req, res) => {
	try {
		const { platform } = req.params

		let sessionToken

		const { state, code } = req.query

		/**
		 * @type {import('../../utils/types/authObject.js').authObject}
		 */
		let authObject = cache.get(state)

		if (!authObject) {
			throw new Error('Authorization token expired. Please try again.')
		}

		if (platform === 'twitter') {
			const { profile_id } = await twitterCallback(
				state,
				code,
				authObject
			)

			sessionToken = await res.jwtSign({ profile_id })
		} else if (platform === 'google') {
			const { profile_id } = await googleCallback(state, code, authObject)

			sessionToken = await res.jwtSign({ profile_id })
		} else if (platform === 'pocket') {
			const { profile_id } = await pocketCallback(state, authObject)

			sessionToken = await res.jwtSign({ profile_id })
		} else if (platform === 'notion') {
			const { profile_id } = await notionCallback(state, code, authObject)

			sessionToken = await res.jwtSign({ profile_id })
		} else if (platform === 'reddit') {
			const { profile_id } = await redditCallback(state, code, authObject)

			sessionToken = await res.jwtSign({ profile_id })
		}

		res.status(302).redirect(
			`${process.env.CLIENT}/app/auth/callback?sessionToken=${sessionToken}`
		)
	} catch (error) {
		throw error
	}
}

export default callback
