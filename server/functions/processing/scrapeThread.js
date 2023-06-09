import axios from 'axios'
import * as cheerio from 'cheerio'
import { NodeHtmlMarkdown } from 'node-html-markdown'
import xss from 'xss'

/**
 * A function that scrapes a particular Twitter thread
 *
 * @param {String} url
 */
const scrapeThread = async (url) => {
	try {
		url = url.replace('twitter.com', 'nitter.fly.dev')

		const response = await axios.get(url)

		const $ = cheerio.load(response.data)

		const tweetData = $('.tweet-body')
			.map(function () {
				let text = $(this).find('.tweet-content').html()

				text = NodeHtmlMarkdown.translate(text)

				let media = $(this).find('.attachments').html()

				if (media) {
					media = NodeHtmlMarkdown.translate(media)
				} else {
					media = undefined
				}

				let profile = $(this)
					.find('.tweet-avatar')
					.find('img')
					.attr('src')

				return {
					text,
					media,
					profile,
				}
			})
			.get()

		const allMedia = $('.tweet-body')
			.find('img')
			.map(function () {
				return $(this).attr('src')
			})
			.get()

		let profilePicUrl = allMedia[0]
		let nextProfilePicUrl

		for (let i = 0; i < allMedia.length; i++) {
			if (allMedia[i].includes('profile_images')) {
				if (allMedia[i] !== profilePicUrl) {
					nextProfilePicUrl = allMedia[i]

					break
				}
			}
		}

		let finalTweet = ''
		let media

		for (let i = 0; i < tweetData.length; i++) {
			if (tweetData[i].profile === nextProfilePicUrl) break

			media = tweetData[i].media

			if (media === undefined) {
				finalTweet += `\n${tweetData[i].text}\n`
			} else {
				finalTweet += `\n${tweetData[i].text}${tweetData[i].media}\n\n`
			}
		}

		let content = finalTweet.replaceAll(
			`/pic`,
			'https://nitter.fly.dev/pic'
		)
		let title = content.substring(0, 64).trimEnd()

		content = xss(content)
		title = xss(title)

		return { title, content }
	} catch (error) {
		throw error
	}
}

export default scrapeThread
