import { google } from 'googleapis'

const googleClient = new google.auth.OAuth2(
	process.env.GOOGLE_ID,
	process.env.GOOGLE_SECRET,
	`${process.env.HOST}/auth/callback/google`
)

export default googleClient
