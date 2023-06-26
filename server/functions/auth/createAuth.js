import mixpanel from '../../utils/api/mixpanel.js'
import {
	Auth,
	Google,
	Notion,
	Pocket,
	Reddit,
	Twitter,
} from '../../utils/initializers/prisma.js'

/**
 * A function to create the auth object of a user
 *
 * @param {import('../../utils/types/userObject.js').userObject} userObject
 */
const createAuth = async ({
	authDetails,
	personalDetails,
	googleTokens,
	twitterTokens,
	pocketTokens,
	redditTokens,
	notionTokens,
}) => {
	try {
		console.log(authDetails)

		await Auth.update({
			data: authDetails,
			where: { profile_id: personalDetails.profile_id },
		})

		if (authDetails.google_id) {
			await Google.create({
				data: { google_id: authDetails.google_id, ...googleTokens },
				include: { auth: true },
			})

			mixpanel.people.set(personalDetails.profile_id, {
				google_auth: true,
			})
		} else if (authDetails.twitter_id) {
			await Twitter.create({
				data: { twitter_id: authDetails.twitter_id, ...twitterTokens },
				include: { auth: true },
			})

			mixpanel.people.set(personalDetails.profile_id, {
				twitter_auth: true,
			})
		} else if (authDetails.pocket_id) {
			await Pocket.create({
				data: { pocket_id: authDetails.pocket_id, ...pocketTokens },
				include: { auth: true },
			})

			mixpanel.people.set(personalDetails.profile_id, {
				pocket_auth: true,
			})
		} else if (authDetails.reddit_id) {
			await Reddit.create({
				data: { reddit_id: authDetails.reddit_id, ...redditTokens },
				include: { auth: true },
			})

			mixpanel.people.set(personalDetails.profile_id, {
				reddit_auth: true,
			})
		} else if (authDetails.notion_id) {
			await Notion.create({
				data: { notion_id: authDetails.notion_id, ...notionTokens },
			})

			mixpanel.people.set(personalDetails.profile_id, {
				notion_auth: true,
			})
		}

		return
	} catch (error) {
		throw error
	}
}

export default createAuth
