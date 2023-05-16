import axios from 'axios'

import client from './client.js'

import findDocuments from '../../document/findDocuments.js'

import scrapeArticle from '../../processing/scrapeArticle.js'

import documentLoadAndStore from '../../lifecycle/documentLoadAndStore.js'

import { Document, User } from '../../../utils/initializers/prisma.js'

/**
 * A function that syncs Pocket bookmarks
 *
 * @param {String} profile_id
 */
const pocketSync = async (profile_id) => {
	try {
		const foundArticleIds = await findDocuments({
			profile_id: profile_id,
			documentMetadata: { pocket_article_id: { not: null } },
		}).then((documents) =>
			documents.map(
				(document) => document.documentMetadata.pocket_article_id
			)
		)

		const { data, headers } = await client(profile_id)

		const pocketArticles = await axios
			.post('https://getpocket.com/v3/get', data, { headers: headers })
			.then((response) =>
				Object.keys(response.data.list)
					.map((key) => [response.data.list[key]])
					.flat()
			)

		const promiseArray = []

		for await (const article of pocketArticles) {
			if (
				foundArticleIds.some(
					(pocket_article_id) => pocket_article_id === article.item_id
				)
			)
				continue

			const scrapeAndSavePromise = new Promise(async (resolve) => {
				const articleData = await scrapeArticle(article.resolved_url)

				const createdDocument = await Document.create({
					data: {
						body: articleData.content,
						heading: articleData.title,
						documentMetadata: {
							create: {
								source: 'pocket',
								pocket_article_id: article.item_id,
								url: article.resolved_url,
							},
						},
					},
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

export default pocketSync
