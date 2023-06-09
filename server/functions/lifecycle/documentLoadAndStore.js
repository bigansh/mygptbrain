import mixpanel from '../../utils/api/mixpanel.js'

import loadAndSplit from '../processing/loadAndSplit.js'
import embedAndStore from '../processing/embedAndStore.js'

/**
 * A function that loads/uploads the documents and then stores them in the DB after processing it
 *
 * @param {String} profile_id
 * @param {import('@prisma/client').Document} document
 */
const documentLoadAndStore = async (profile_id, document) => {
	try {
		if (!document) throw new Error('Failed to load the document')

		const chunks = await loadAndSplit(document, profile_id)

		await embedAndStore(chunks)

		mixpanel.track('create_document', {
			distinct_id: profile_id,
			document_source: document.documentMetadata?.source,
			upload_file_type: document.documentMetadata?.document_file_type,
			document_name: document?.heading,
			url: document.documentMetadata?.url,
			pocket_article_id: document.documentMetadata?.pocket_article_id,
			twitter_status_id: document.documentMetadata?.twitter_status_id,
			reddit_post_id: document.documentMetadata?.reddit_post_id,
			url: document.documentMetadata?.url,
		})

		mixpanel.people.increment(profile_id, 'documents_stored')

		return {
			documentLoaded: true,
		}
	} catch (error) {
		throw error
	}
}

export default documentLoadAndStore
