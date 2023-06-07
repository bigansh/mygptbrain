export interface chatQueryObject {
	prompt?: string
	chat_id?: string
	profile_id?: string
	chat_history?: string
	chat_name?: string
	chat_array?: {
		user: string
		llm: string
	}[]
}
