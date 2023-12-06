import { Client } from '@notionhq/client'

import { Auth } from '../../../utils/initializers/prisma.js'

const client = async (profile_id) => {
	try {
		const { notion } = await Auth.findUnique({
			where: { profile_id: profile_id },
			select: { notion: { select: { access_token: true } } },
		})

		return new Client({ auth: notion.access_token })
	} catch (error) {
		throw error
	}
}

export default client
