import authFinder from '../auth/authFinder.js'
import redditSync from '../platforms/reddit/redditSync.js'
import twitterSync from '../platforms/twitter/twitterSync.js'
import pocketSync from '../platforms/pocket/pocketSync.js'
import googleSync from '../platforms/google/googleSync.js'
import notionSync from '../platforms/notion/notionSync.js'

/**
 * A function that syncs all the data from all the connected platform of a user and then loads and store them in the DB
 *
 * @param {String} profile_id
 */
const platformSyncAndLoadAndStore = async (profile_id) => {
	try {
		const userAuth = await authFinder(profile_id)

		const platforms = []

		if (userAuth.pocket_id) {
			platforms.push(pocketSync(profile_id))
		}
		if (userAuth.reddit_id) {
			platforms.push(redditSync(profile_id))
		}
		if (userAuth.twitter_id) {
			platforms.push(twitterSync(profile_id))
		}
		if (userAuth.notion_id) {
			platforms.push(notionSync(profile_id))
		}
		if (
			userAuth.google.scope_authenticated.some((scope) =>
				['keep', 'drive'].includes(scope)
			)
		) {
			platforms.push(googleSync(profile_id))
		}

		return (await Promise.allSettled(platforms)).flat()
	} catch (error) {
		throw error
	}
}

export default platformSyncAndLoadAndStore
