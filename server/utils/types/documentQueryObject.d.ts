export interface documentQueryObject {
	profile_id?: string | object
	document_id?: string | object
	documentMetadata?: {
		pocket_article_id?: string | object
		twitter_status_id?: string | object
		reddit_post_id?: string | object
		document_file_type?: string | object
		url?: string
	}
}
