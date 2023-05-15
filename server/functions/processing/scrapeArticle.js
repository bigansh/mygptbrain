import { extract } from 'article-parser'

/**
 * A function that scrapes the article of a particular link
 * 
 * @param {String} url 
 */
const scrapeArticle = async (url) => {
	try {
		const { title, content } = await extract(
			url,
			{},
			{
				headers: {
					Accept: 'text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8',
					'Accept-Encoding': 'gzip, deflate',
					'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
					'Keep-Alive': 'timeout=5, mix=10',
					Dnt: '1',
					'Upgrade-Insecure-Requests': '1',
					'User-Agent':
						'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z Safari/537.36',
				},
			}
		)

		if (!content || !title)
			throw new Error(
				"Sorry, we don't have functionality needed to scrape this website. We will store this bookmark but you won't be able to open the canvas for the same. "
			)

		return { title, content }
	} catch (error) {
		throw error
	}
}

export default scrapeArticle
