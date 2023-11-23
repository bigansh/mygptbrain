import { youtube } from '@googleapis/youtube'
import { google } from 'googleapis'
import { ChatGooglePaLM } from 'langchain/chat_models/googlepalm'

const googleClient = new google.auth.OAuth2(
	process.env.GOOGLE_ID,
	process.env.GOOGLE_SECRET,
	`${process.env.HOST}/auth/callback/google`
)

export const youtubeClient = youtube

export default googleClient

export const palm = new ChatGooglePaLM({
	apiKey: process.env.PALM_ID,
	temperature: 0
})
