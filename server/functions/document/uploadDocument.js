import pdf from 'pdf-parse/lib/pdf-parse.js'
import officeParser from 'officeparser'

import documentLoadAndStore from '../lifecycle/documentLoadAndStore.js'

import { Document } from '../../utils/initializers/prisma.js'

/**
 * A function that extracts the content of the uploaded file and create a record in the DB
 *
 * @param {import("@fastify/multipart").MultipartFile} file
 * @param {String} profile_id
 */
const uploadDocument = async (file, profile_id) => {
	try {
		/**
		 * @type {import('utils/types/documentObjects.js').documentObjects}
		 */
		let documentObj = {}

		if (file.mimetype === 'application/pdf')
			documentObj.body = (await pdf(await file.toBuffer()))?.text
		else if (
			file.mimetype.includes(
				'application/vnd.openxmlformats-officedocument'
			)
		)
			documentObj.body = officeParser.parseOfficeAsync(
				await file.toBuffer()
			)
		else throw new Error('File type is currently not supported!')

		documentObj = {
			...documentObj,
			heading: file.filename,
			documentMetadata: {
				source: 'upload',
				document_file_type: file.mimetype,
			},
		}

		const createdDocument = await Document.create({
			data: {
				body: documentObj.body,
				heading: documentObj.heading,
				profile_id: profile_id,
				documentMetadata: { create: documentObj.documentMetadata },
			},
		})

		documentLoadAndStore(profile_id, createdDocument)

		return createdDocument
	} catch (error) {
		throw error
	}
}

export default uploadDocument
