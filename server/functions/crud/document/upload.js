import pdf from 'pdf-parse/lib/pdf-parse.js'
import officeParser from 'officeparser'

/**
 * A function that extracts the content of the uploaded file.
 *
 * @param {import("@fastify/multipart").MultipartFile} file
 */
const upload = async (file) => {
	try {
        /**
         * @type {import('../../../utils/types/contentObjects').contentObjects}
         */
		let contentObjects = {}

		if (file.mimetype === 'application/pdf')
			contentObjects.body = (await pdf(await file.toBuffer()))?.text
		else if (
			file.mimetype.includes(
				'application/vnd.openxmlformats-officedocument'
			)
		)
			contentObjects.body = officeParser.parseOfficeAsync(
				await file.toBuffer()
			)
		else throw new Error('File type is currently not supported!')

		contentObjects = {
			...contentObjects,
			source: 'upload',
			heading: file.filename,
		}
	} catch (error) {
		throw error
	}
}

export default upload
