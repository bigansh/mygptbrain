import pdf from 'pdf-parse/lib/pdf-parse.js'
import officeParser from 'officeparser'
import xss from 'xss'
import tesseract from 'node-tesseract-ocr'

import documentLoadAndStore from './documentLoadAndStore.js'
import checkSubscription from '../utility/checkSubscription.js'
import createDocument from '../document/createDocument.js'

/**
 * A function that extracts the content of the uploaded file and create a record in the DB
 *
 * @param {import("@fastify/multipart").MultipartFile} file
 * @param {String} profile_id
 */
const uploadDocumentAndStore = async (file, profile_id) => {
	try {
		let content

		const fileBuffer = await file.toBuffer()

		if (Buffer.byteLength(fileBuffer) > 10 * 1024 * 1024) {
			await checkSubscription(profile_id)
		}

		if (file.mimetype === 'application/pdf') {
			content = (await pdf(fileBuffer))?.text

			content = xss(content)
		} else if (
			file.mimetype.includes(
				'application/vnd.openxmlformats-officedocument'
			)
		) {
			content = await officeParser.parseOfficeAsync(fileBuffer)

			content = xss(content)
		} else if (
			['image/heic', 'image/jpeg', 'image/png'].some(
				(type) => type === file.mimetype
			)
		) {


			content = await tesseract.recognize(fileBuffer)

			content = xss(content)
		} else {
			throw new Error('File type is currently not supported!')
		}

		const createdDocument = await createDocument(profile_id, {
			body: content,
			heading: file.filename,
			profile_id: profile_id,
			documentMetadata: {
				create: {
					source: 'upload',
					document_file_type: file.mimetype,
				},
			},
		})

		await documentLoadAndStore(profile_id, createdDocument)

		return createdDocument
	} catch (error) {
		throw error
	}
}

export default uploadDocumentAndStore
