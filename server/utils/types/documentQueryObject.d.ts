export interface documentQueryObject {
	profile_id?: string
	document_id?: string
	documentMetadata?: {
		pocket_article_id: string | Object
		twitter_status_id: string | Object
		reddit_post_id: string | Object
		document_file_type: string | Object
	}
}
