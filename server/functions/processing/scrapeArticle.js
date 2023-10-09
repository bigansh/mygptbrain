import { extract } from '@extractus/article-extractor'
import { NodeHtmlMarkdown } from 'node-html-markdown'
import xss from 'xss'

/**
 * A function that scrapes the article of a particular link
 *
 * @param {String} url
 */
const scrapeArticle = async (url) => {
	try {
		const data = await extract(url)

		const content = xss(data?.content)
		const title = xss(data?.title)
		const source = xss(data?.source)

		if (!content || !title)
			throw new Error(
				"Sorry, we don't have functionality needed to scrape this website. We will store this bookmark but you won't be able to open the canvas for the same. "
			)

		return {
			title,
			content: NodeHtmlMarkdown.translate(content),
			source: source,
		}
	} catch (error) {
		throw error
	}
}

export default scrapeArticle
