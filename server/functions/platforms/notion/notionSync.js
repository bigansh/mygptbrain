import { NotionToMarkdown } from 'notion-to-md'

import findDocuments from '../../document/findDocuments.js'
import documentLoadAndStore from '../../lifecycle/documentLoadAndStore.js'
import createDocument from '../../document/createDocument.js'

import client from './client.js'

/**
 * A function that will sync Notion's DBs and pages of a user
 *
 * @param {String} profile_id
 */
const notionSync = async (profile_id) => {
	try {
		const foundDocumentIds = await findDocuments({
			profile_id: profile_id,
			documentMetadata: { notion_document_id: { not: null } },
		}).then((documents) =>
			documents.map(
				(document) => document.documentMetadata.notion_document_id
			)
		)

		const notionClient = await client(profile_id)

		const n2m = new NotionToMarkdown({
			notionClient: notionClient,
			config: { parseChildPages: false },
		})

		const notionDatabases = await notionClient.search({
			filter: {
				property: 'object',
				value: 'database',
			},
		})

		const pagesPromise = []

		for await (const databases of notionDatabases.results) {
			const databasePages = await notionClient.databases.query({
				database_id: databases.id,
			})

			for (const page of databasePages.results) {
				if (
					foundDocumentIds.some(
						(documentId) => documentId === page.id
					)
				) {
					continue
				}

				const scrapeAndSavePromise = new Promise(
					async (resolve, reject) => {
						try {
							const documentMarkdown = n2m.toMarkdownString(
								await n2m.pageToMarkdown(page.id)
							)

							if (!documentMarkdown.parent) {
								return
							}

							const createdDocument = await createDocument(
								profile_id,
								{
									body: documentMarkdown.parent,
									heading:
										page.title || page.url || 'Untitled',
									profile_id: profile_id,
									documentMetadata: {
										create: {
											source: 'notion',
											notion_document_id: page.id,
											url: page.url,
										},
									},
								}
							)

							await documentLoadAndStore(
								profile_id,
								createdDocument
							)

							resolve(createdDocument)
						} catch (error) {
							reject(error)
						}
					}
				)

				pagesPromise.push(scrapeAndSavePromise)
			}
		}

		return await Promise.allSettled(pagesPromise)
	} catch (error) {
		throw error
	}
}

export default notionSync
