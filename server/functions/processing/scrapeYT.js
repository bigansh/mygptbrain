import { YoutubeTranscript } from 'youtube-transcript'
import ytdl from 'ytdl-core'

/**
 * A function that will scrape a YT video
 *
 * @param {String} url
 */
const scrapeYT = async (url) => {
	try {
		const [script, title] = await Promise.all([
			YoutubeTranscript.fetchTranscript(url).then((scenes) =>
				scenes.map(({ text }) => text).join(' ')
			),
			ytdl.getInfo(url).then((info) => info.videoDetails.title),
		])

		return {
			title: title,
			content: script,
		}
	} catch (error) {
		throw error
	}
}

await scrapeYT('https://youtu.be/KZA_BIa8e7I?si=WYNEfITdn7hc6bJ_')

export default scrapeYT