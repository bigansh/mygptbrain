import { google } from 'googleapis'
import pdf from 'pdf-parse/lib/pdf-parse.js'

import client from './client.js'

import findDocuments from '../../document/findDocuments.js'

const googleSync = async (profile_id) => {
	try {
		const googleClient = await client(profile_id)

		const services = google.drive({ version: 'v3', auth: googleClient })

		// const res = await services.files.list({
		// 	fields: 'nextPageToken, files(id, name, mimeType)',
		// 	spaces: 'drive',
		// 	q: "name='Resume.pdf'",
		// })

		// console.log(res.data.files)

		const file = await services.files.get({
			fileId: '1HuoHllcKn9qefd-18lZ-PoMQjChR6cmW',
			alt: 'media',
		})

		const blob = new Blob(file.data)

		console.log(blob)

		// const foundKeepIds = []
		// const foundDriveIds = await findDocuments({
		// 	profile_id: profile_id,
		// 	documentMetadata: {
		// 		drive_document_id: { not: null },
		// 		keep_id: { not: null },
		// 	},
		// }).then((documents) =>
		// 	documents.map((document) => {
		// 		foundKeepIds.push(document.documentMetadata?.keep_id)

		// 		return document.documentMetadata?.drive_document_id
		// 	})
		// )

		// const promiseArray = []

		// return await Promise.all(promiseArray)
	} catch (error) {
		throw error
	}
}

export default googleSync
