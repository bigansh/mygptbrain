import createDocument from '../document/createDocument.js'
import scrapeArticle from '../processing/scrapeArticle.js'
import scrapeThread from '../processing/scrapeThread.js'
import scrapeYT from '../processing/scrapeYT.js'
import documentLoadAndStore from './documentLoadAndStore.js'

/**
 * A function that scrapes a given link and then stores it in the DB
 *
 * @param {String} url
 * @param {String} profile_id
 */
const scrapeAndLoadAndStore = async (url, profile_id) => {
	try {
		let data

		if (url.includes('https://twitter.com')) {
			data = await scrapeArticle(
				url.replace('https://twitter.com', 'https://nitter.net')
			)

			data.source = 'twitter'
		} else if (
			url.includes('https://youtube.com') ||
			url.includes('https://youtu.be')
		) {
			data = await scrapeYT(url)

			data.source = 'youtube'
		} else {
			data = await scrapeArticle(url)

			data.source = 'article'
		}

		const createdDocument = await createDocument(profile_id, {
			body: data.content,
			heading: data.title,
			profile_id: profile_id,
			documentMetadata: {
				create: {
					source: data.source,
					url: url,
				},
			},
		})

		await documentLoadAndStore(profile_id, createdDocument)

		return createdDocument
	} catch (error) {
		throw error
	}
}

export default scrapeAndLoadAndStore
