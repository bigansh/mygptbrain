import { drive_v3, google } from 'googleapis'
import pdf from 'pdf-parse/lib/pdf-parse.js'
import xss from 'xss'
import officeParser from 'officeparser'
import toArray from 'stream-to-array'

import client from './client.js'

import findDocuments from '../../document/findDocuments.js'
import documentLoadAndStore from '../../lifecycle/documentLoadAndStore.js'
import createDocument from '../../document/createDocument.js'

/**
 * A function that syncs Google Drive and Keep files
 *
 * @param {String} profile_id
 */
const googleSync = async (profile_id) => {
	try {
		const foundDriveIds = await findDocuments({
			profile_id: profile_id,
			documentMetadata: {
				drive_document_id: { not: null },
			},
		}).then((documents) =>
			documents.map(
				(document) => document.documentMetadata.drive_document_id
			)
		)

		const googleClient = await client(profile_id)

		const drive = google.drive({ version: 'v3', auth: googleClient })

		/**
		 * @type {drive_v3.Schema$File[]}
		 */
		let driveFiles = [],
			pageToken

		do {
			const response = await drive.files.list({
				fields: 'nextPageToken, files(id, name, mimeType)',
				spaces: 'drive',
				corpora: 'user',
				includeItemsFromAllDrives: false,
				supportsAllDrives: false,
				pageToken: pageToken,
			})

			if (response.data.files) {
				response.data.files.forEach((file) => {
					if (
						[
							'application/pdf',
							'application/vnd.openxmlformats-officedocument',
							'application/vnd.google-apps.presentation',
							'application/vnd.google-apps.spreadsheet',
							'application/vnd.google-apps.document',
						].some((fileType) => fileType === file.mimeType) &&
						!foundDriveIds.includes(file.id)
					) {
						driveFiles.push(file)
					}
				})
			}

			pageToken = response.data.nextPageToken
		} while (pageToken)

		const promiseArray = []

		for (const file of driveFiles) {
			const saveAndLoadPromise = new Promise(async (resolve, reject) => {
				let content

				if (
					[
						'application/pdf',
						'application/vnd.openxmlformats-officedocument',
					].some((fileType) => fileType === file.mimeType)
				) {
					const fileData = await drive.files.get(
						{ fileId: file.id, alt: 'media' },
						{ responseType: 'stream' }
					)

					const fileBuffer = await toArray(fileData.data).then(
						(chunks) => Buffer.concat(chunks)
					)

					if (!fileBuffer) {
						reject('Unable to get the document Buffer.')
					}

					if (file.mimeType === 'application/pdf') {
						content = (await pdf(fileBuffer))?.text

						content = xss(content)
					} else if (
						file.mimeType.includes(
							'application/vnd.openxmlformats-officedocument'
						)
					) {
						content = await officeParser.parseOfficeAsync(
							fileBuffer
						)

						content = xss(content)
					}
				}
				// else {
				// 	const toPDF = await drive.files.export({
				// 		fileId: file.id,
				// 		mimeType: 'application/pdf',
				// 	})

				// 	content = (await pdf(Buffer.from(toPDF.data)))?.text

				// 	content = xss(content)

				// 	console.log(content)
				// }

				const createdDocument = await createDocument(profile_id, {
					body: content,
					heading: file.name,
					profile_id: profile_id,
					documentMetadata: {
						create: {
							source: 'drive',
							document_file_type: file.mimeType,
							url: `https://drive.google.com/file/d/${file.id}`,
							drive_document_id: file.id,
						},
					},
				})

				await documentLoadAndStore(profile_id, createdDocument)

				resolve(createdDocument)
			})

			promiseArray.push(saveAndLoadPromise)
		}

		return await Promise.allSettled(promiseArray).catch((error) => {
			throw error
		})
	} catch (error) {
		throw error
	}
}

export default googleSync
