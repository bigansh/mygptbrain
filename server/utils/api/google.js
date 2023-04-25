import { google } from 'googleapis'

const googleClient = new google.auth.OAuth2(
	process.env.CLIENT_ID_GOOGLE,
	process.env.CLIENT_SECRET_GOOGLE,
	`${process.env.HOST}/auth/callback/google`
)

export default googleClient
