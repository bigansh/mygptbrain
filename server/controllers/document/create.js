import platformSyncAndLoadAndStore from '../../functions/lifecycle/platformSyncAndLoadAndStore.js'
import uploadDocumentAndStore from '../../functions/lifecycle/uploadDocumentAndStore.js'
import scrapeAndLoadAndStore from '../../functions/lifecycle/scrapeAndLoadAndStore.js'

/**
 * A controller to handle the create requests for documents
 *
 * @param {import("fastify").FastifyRequest} req
 * @param {import("fastify").FastifyReply} res
 */
const create = async (req, res) => {
	try {
		const { query_type } = req.query

		const { profile_id } = req.user

		let data

		if (query_type === 'upload') {
			data = await uploadDocumentAndStore(await req.file(), profile_id)
		} else if (query_type === 'sync') {
			data = await platformSyncAndLoadAndStore(profile_id)
		} else if (query_type === 'scrape') {
			data = await scrapeAndLoadAndStore(
				req.body.documentQueryObject.documentMetadata.url,
				profile_id
			)
		}

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

export default create
