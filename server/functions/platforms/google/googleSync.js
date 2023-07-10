import { google } from 'googleapis'

import client from './client.js'

import findDocuments from '../../document/findDocuments.js'

const googleSync = async (profile_id) => {
	try {
		const googleClient = await client(profile_id)

		const services = google.drive({ version: 'v3', auth: googleClient })

		// const res = await services.files.list({
		// 	fields: 'nextPageToken, files(id, name, mimeType)',
		// 	spaces: 'drive',
		// })

		// console.log(res.data.files)

		const file = await services.files.get({
			fileId: '1Y5v_-AIhdZwt8Ux50Q0sKOOHL27-Plgr',
			alt: 'media',
		})

		console.log(atob(file.data))

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
