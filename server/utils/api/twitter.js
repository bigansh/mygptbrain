import { TwitterApi } from 'twitter-api-v2'

const twitterClient = new TwitterApi({
	clientId: process.env.TWITTER_ID,
	clientSecret: process.env.TWITTER_SECRET,
})

export default twitterClient
