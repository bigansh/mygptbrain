import pdf from 'pdf-parse/lib/pdf-parse.js'
import officeParser from 'officeparser'
import xss from 'xss'

import { Document } from '../../utils/initializers/prisma.js'

import documentLoadAndStore from './documentLoadAndStore.js'

/**
 * A function that extracts the content of the uploaded file and create a record in the DB
 *
 * @param {import("@fastify/multipart").MultipartFile} file
 * @param {String} profile_id
 */
const uploadDocumentAndStore = async (file, profile_id) => {
	try {
		let content

		if (file.mimetype === 'application/pdf') {
			content = (await pdf(await file.toBuffer()))?.text

			content = xss(content)
		} else if (
			file.mimetype.includes(
				'application/vnd.openxmlformats-officedocument'
			)
		) {
			content = officeParser.parseOfficeAsync(await file.toBuffer())

			content = xss(content)
		} else {
			throw new Error('File type is currently not supported!')
		}

		const createdDocument = await Document.create({
			data: {
				body: content,
				heading: file.filename,
				profile_id: profile_id,
				documentMetadata: {
					create: {
						source: 'upload',
						document_file_type: file.mimetype,
					},
				},
			},
			include: { documentMetadata: true },
		})

		await documentLoadAndStore(profile_id, createdDocument)

		return createdDocument
	} catch (error) {
		throw error
	}
}

export default uploadDocumentAndStore
