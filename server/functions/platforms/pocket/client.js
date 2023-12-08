import pocketClient from '../../../utils/api/pocket.js'

import { Auth } from '../../../utils/initializers/prisma.js'

/**
 * A function that returns user client for Pocket
 *
 * @param {String} profile_id
 */
const client = async (profile_id) => {
	try {
		const { pocket } = await Auth.findUnique({
			where: { profile_id: profile_id },
			select: { pocket: { select: { access_token: true } } },
		})

		return pocketClient(undefined, pocket.access_token)
	} catch (error) {
		throw error
	}
}

export default client
