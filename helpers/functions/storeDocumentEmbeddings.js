import { vectorStore } from '../utils/api/supabase.js'

export default async (chunks) => {
	try {
		return await vectorStore.addDocuments(chunks)
	} catch (error) {
		throw error
	}
}
