export interface documentObjects {
	body: string
	heading: string
	documentMetadata: documentMetadataObjects
}

interface documentMetadataObjects {
	twitter_status_id?: string
	reddit_post_id?: string
	pocket_article_id?: string
	document_file_type?: string
	url?: string
}
