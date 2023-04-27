import cache from '../../utils/initializers/cache.js'

import twitterCallback from '../../functions/auth/twitter/twitterCallback.js'
import googleCallback from '../../functions/auth/google/googleCallback.js'
import pocketCallback from '../../functions/auth/pocket/pocketCallback.js'

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
		 * @type {import('../../utils/types/authObjects.js').authObjects}
		 */
		let authObjects = cache.get(state)

		if (!authObjects)
			throw new Error('Authorization token expired. Please try again.')

		if (platform === 'twitter') {
			const { profile_id } = await twitterCallback(
				state,
				code,
				authObjects
			)

			sessionToken = await res.jwtSign({ profile_id })
		} else if (platform === 'google') {
			const { profile_id } = await googleCallback(
				state,
				code,
				authObjects
			)

			sessionToken = await res.jwtSign({ profile_id })
		} else if (platform === 'pocket') {
			const { profile_id } = await pocketCallback(
				state,
				code,
				authObjects
			)

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
