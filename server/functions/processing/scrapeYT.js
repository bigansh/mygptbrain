import { YoutubeTranscript } from 'youtube-transcript'

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
			// ytdl.getInfo(url).then((info) => info.videoDetails.title),
		])

		return {
			title: url,
			content: script,
		}
	} catch (error) {
		throw error
	}
}

export default scrapeYT
