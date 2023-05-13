import pdf from 'pdf-parse/lib/pdf-parse.js'
import officeParser from 'officeparser'

import { Document, User } from '../../utils/initializers/prisma.js'

/**
 * A function that extracts the content of the uploaded file and create a record in the DB
 *
 * @param {import("@fastify/multipart").MultipartFile} file
 * @param {String} profile_id
 */
const uploadDocument = async (file, profile_id) => {
	try {
		/**
		 * @type {import('../../utils/types/documentObjects.js').documentObjects}
		 */
		let documentObjects = {}

		if (file.mimetype === 'application/pdf')
			documentObjects.body = (await pdf(await file.toBuffer()))?.text
		else if (
			file.mimetype.includes(
				'application/vnd.openxmlformats-officedocument'
			)
		)
			contentObjects.body = officeParser.parseOfficeAsync(
				await file.toBuffer()
			)
		else throw new Error('File type is currently not supported!')

		documentObjects = {
			...documentObjects,
			source: 'upload',
			heading: file.filename,
		}

		const createdDocument = await Document.create({
			data: {
				profile_id: profile_id,
				...documentObjects,
			},
		})

		await User.update({
			where: { profile_id: profile_id },
			data: { documents: { connect: { document_id: createdDocument.document_id } } },
		})

		return createdDocument
	} catch (error) {
		throw error
	}
}

export default uploadDocument
