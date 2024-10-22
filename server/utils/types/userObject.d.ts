export interface userObject {
	personalDetails: {
		name: string
		email: string
		profile_id: string
	}
	authDetails: {
		google_id?: string
		reddit_id?: string
		twitter_id?: string
		pocket_id?: string
		notion_id?: string
		password?: string
		password_salt?: string
	}
	notionTokens?: {
		access_token: string
		workspace_id: string
		database_ids?: string[]
	}
	googleTokens?: {
		access_token: string
		refresh_token: string
		scope_authenticated: string[]
	}
	redditTokens?: {
		access_token: string
		refresh_token: string
	}
	twitterTokens?: {
		access_token: string
		refresh_token: string
	}
	pocketTokens?: {
		access_token: string
	}
}
