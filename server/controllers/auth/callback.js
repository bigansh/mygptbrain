import cache from '../../utils/initializers/cache.js'

import twitterCallback from '../../functions/auth/twitter/twitterCallback.js'
import googleCallback from '../../functions/auth/google/googleCallback.js'

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

		/**
		 * @type {import('../../utils/types/authObjects.js').authObjects}
		 */
		const authObjects = cache.get(state)

		if (platform === 'twitter') {
			const { state, code } = req.query

			if (!authObjects)
				throw new Error(
					'Authorization token expired. Please try again.'
				)

			const { profile_id } = await twitterCallback(
				state,
				code,
				authObjects
			)

			sessionToken = await res.jwtSign({ profile_id })
		} else if (platform === 'google') {
			const { state, code } = req.query

			if (!authObjects)
				throw new Error(
					'Authorization token expired. Please try again.'
				)

			const { profile_id } = await googleCallback(
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
