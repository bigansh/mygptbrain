import pocketClient from '../../../utils/api/pocket.js'

import { Auth } from '../../../utils/initializers/prisma.js'

/**
 * A function that returns user client for Pocket
 *
 * @param {String} profile_id
 */
const client = async (profile_id) => {
	try {
		const { pocket_id, pocket } = await Auth.findUnique({
			where: { profile_id: profile_id },
			include: { pocket: true },
			cacheStrategy: { ttl: 60 },
		})

		return pocketClient(undefined, pocket.access_token)
	} catch (error) {
		throw error
	}
}

export default client
