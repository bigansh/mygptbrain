import client from './client.js'

import findDocuments from '../../document/findDocuments.js'

import scrapeThread from '../../processing/scrapeThread.js'

import documentLoadAndStore from '../../lifecycle/documentLoadAndStore.js'

import { Document, User } from '../../../utils/initializers/prisma.js'

/**
 * A function that syncs Twitter bookmarks
 *
 * @param {String} profile_id
 */
const twitterSync = async (profile_id) => {
	try {
		const twitterClient = await client(profile_id)

		const foundTwitterIds = await findDocuments({
			profile_id: profile_id,
			documentMetadata: { twitter_status_id: { not: null } },
		}).then((documents) =>
			documents.map(
				(document) => document.documentMetadata.twitter_status_id
			)
		)

		const twitterBookmarks = await twitterClient.v2.bookmarks()

		const promiseArray = []

		for await (const tweet of twitterBookmarks) {
			if (
				foundTwitterIds.some(
					(twitter_status_id) => twitter_status_id === tweet.id
				)
			)
				continue

			const scrapeAndSavePromise = new Promise(async (resolve) => {
				const threadData = await scrapeThread(
					`https://twitter.com/${tweet.author_id}/status/${tweet.id}`
				)

				const createdDocument = await Document.create({
					data: {
						body: threadData.content,
						heading: threadData.title,
						documentMetadata: {
							create: {
								source: 'twitter',
								twitter_status_id: tweet.id,
								url: `https://twitter.com/${tweet.author_id}/status/${tweet.id}`,
							},
						},
					},
					include: { documentMetadata: true },
				})

				await User.update({
					where: { profile_id: profile_id },
					data: {
						documents: {
							connect: {
								document_id: createdDocument.document_id,
							},
						},
					},
				})

				documentLoadAndStore(profile_id, createdDocument)

				resolve(createdDocument)
			})

			promiseArray.push(scrapeAndSavePromise)
		}

		await Promise.allSettled(promiseArray)
	} catch (error) {
		throw error
	}
}

export default twitterSync
