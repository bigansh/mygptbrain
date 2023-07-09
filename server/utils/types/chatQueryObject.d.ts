export interface chatQueryObject {
	prompt?: string
	chat_id?: string | object
	profile_id?: string
	source_documents?: string[]
	chat_history?: string
	chat_name?: string
	chat_array?: {
		user: string
		llm: string
	}[]
}
