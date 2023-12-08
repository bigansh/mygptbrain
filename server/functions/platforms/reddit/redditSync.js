import xss from 'xss'

import client from './client.js'

import documentLoadAndStore from '../../lifecycle/documentLoadAndStore.js'
import findDocuments from '../../document/findDocuments.js'
import createDocument from '../../document/createDocument.js'

/**
 * A function that syncs Reddit bookmarks
 *
 * @param {String} profile_id
 */
const redditSync = async (profile_id) => {
	try {
		const redditClient = await client(profile_id)

		const foundRedditIds = await findDocuments({
			profile_id: profile_id,
			documentMetadata: { reddit_post_id: { not: null } },
		}).then((documents) =>
			documents.map(
				(document) => document.documentMetadata.reddit_post_id
			)
		)

		const redditBookmarks = JSON.parse(
			JSON.stringify(await redditClient.getMe().getSavedContent())
		)

		const promiseArray = []

		for (const post of redditBookmarks) {
			if (
				foundRedditIds.some(
					(reddit_post_id) => reddit_post_id === post.id
				)
			) {
				continue
			}
			const saveAndLoadPromise = new Promise(async (resolve) => {
				const createdDocument = await createDocument(profile_id, {
					body: xss(post?.body || post?.selftext),
					heading: xss(post?.title || post?.link_title),
					profile_id: profile_id,
					documentMetadata: {
						create: {
							source: 'reddit',
							reddit_post_id: post.id,
							url: `https://reddit.com/comments/${post.id}`,
						},
					},
				})

				await documentLoadAndStore(profile_id, createdDocument)

				resolve(createdDocument)
			})

			promiseArray.push(saveAndLoadPromise)
		}

		return await Promise.allSettled(promiseArray)
	} catch (error) {
		throw error
	}
}

export default redditSync
