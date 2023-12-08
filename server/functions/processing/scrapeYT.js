import getVideoId from 'get-video-id'
import { getVideoDetails } from 'youtube-caption-extractor'

/**
 * A function that will scrape a YT video
 *
 * @param {String} url
 */
const scrapeYT = async (url) => {
	try {
		const { id } = getVideoId(url)

		const video = await getVideoDetails({ videoID: id })

		return {
			title: video.title,
			content: video.subtitles.map(({ text }) => text).join(' '),
		}
	} catch (error) {
		throw error
	}
}

await scrapeYT('https://www.youtube.com/watch?v=kZ77X67GUfk')

export default scrapeYT
