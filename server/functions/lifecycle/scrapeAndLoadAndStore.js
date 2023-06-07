import { Document, User } from '../../utils/initializers/prisma.js'

import scrapeArticle from '../processing/scrapeArticle.js'
import documentLoadAndStore from './documentLoadAndStore.js'

/**
 * A function that scrapes a given link and then stores it in the DB
 *
 * @param {String} url
 * @param {String} profile_id
 */
const scrapeAndLoadAndStore = async (url, profile_id) => {
	try {
		const articleData = await scrapeArticle(url)

		const createdDocument = await Document.create({
			data: {
				body: articleData.content,
				heading: articleData.title,
				profile_id: profile_id,
				documentMetadata: {
					create: {
						source: 'custom',
						url: url,
					},
				},
			},
			include: { documentMetadata: true },
		})

		console.log(createdDocument)

		await documentLoadAndStore(profile_id, createdDocument)

		return createdDocument
	} catch (error) {
		throw error
	}
}

export default scrapeAndLoadAndStore
