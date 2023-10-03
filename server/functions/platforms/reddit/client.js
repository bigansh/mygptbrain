import { Auth } from '../../../utils/initializers/prisma.js'

import redditClient from '../../../utils/api/reddit.js'

const client = async (profile_id) => {
	try {
		const { reddit, reddit_id } = await Auth.findUnique({
			where: { profile_id: profile_id },
			include: { reddit: true },
		})

		const redditUserClient = redditClient(reddit.refresh_token)

		reddit.access_token =
			redditUserClient.accessToken || reddit.access_token
		reddit.refresh_token = redditUserClient.refreshToken

		await Auth.update({
			data: {
				reddit: {
					update: {
						access_token: reddit.access_token,
						refresh_token: reddit.refresh_token,
					},
				},
			},
			where: { profile_id: profile_id },
		})

		return redditUserClient
	} catch (error) {
		throw error
	}
}

export default client
