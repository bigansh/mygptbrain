export interface documentQueryObject {
	profile_id?: string | object
	document_id?: string | object
	documentMetadata?: {
		pocket_article_id?: string | object
		twitter_status_id?: string | object
		reddit_post_id?: string | object
		document_file_type?: string | object
		keep_id?: string | object
		drive_document_id?: string | object
		url?: string
	}
}
