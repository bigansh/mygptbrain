import googleClient from '../../../utils/api/google.js'
import { Auth } from '../../../utils/initializers/prisma.js'

/**
 * A function that returns user client for Google
 */
const client = async (profile_id) => {
	try {
		const { google, google_id } = await Auth.findUnique({
			where: { profile_id: profile_id },
			include: { google: true },
		})

		const userClient = googleClient

		userClient.setCredentials({
			access_token: google.access_token,
			refresh_token: google.refresh_token,
		})

		userClient.on('tokens', (tokens) => {
			if (tokens.refresh_token) {
				google.refresh_token = tokens.refresh_token
			}

			google.access_token = tokens.access_token
		})

		await Auth.update({
			where: { profile_id: profile_id },
			data: {
				google: {
					update: {
						access_token: google.access_token,
						refresh_token: google.refresh_token,
					},
				},
			},
		})

		userClient.setCredentials({
			access_token: google.access_token,
			refresh_token: google.refresh_token,
		})

		return userClient
	} catch (error) {
		throw error
	}
}

export default client
