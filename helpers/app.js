import 'dotenv/config.js'

import csv from 'csvtojson'
import { readFile } from 'fs/promises'

import textSplitter from './functions/textSplitter.js'
import storeDocumentEmbeddings from './functions/storeDocumentEmbeddings.js'

// const pgBlogs = await csv().fromFile(
// 	'/Users/bigansh/Programming/myGPTBrain/helpers/personas/data/pg.csv'
// )

// for await (const blog of pgBlogs) {
// 	const chunks = await textSplitter(blog)

// 	const embeddings = await storeDocumentEmbeddings(chunks)
// }

// let lex = JSON.parse(
// 	await readFile(
// 		'/Users/bigansh/Programming/myGPTBrain/helpers/personas/data/lex.json',
// 		'utf8'
// 	)
// )

// const lexPodcasts = []

// for (const key in lex.id) {
// 	lexPodcasts.push({
// 		id: lex.id[key],
// 		title: lex.title[key],
// 		content: lex.text[key],
// 		source: `https://youtube.com/watch?v=${lex.id[key]}`,
// 		author: 'Lex Fridman',
// 	})
// }

// for await (const podcast of lexPodcasts) {
// 	const chunks = await textSplitter(podcast)

// 	const embeddings = await storeDocumentEmbeddings(chunks)
// }

const tsLyrics = await csv().fromFile(
	'/Users/bigansh/Programming/myGPTBrain/helpers/personas/data/ts.csv'
)
csv().fromFile(csv)

// taylor swift

for await (const song of tsLyrics) {
	const modifiedName = song['Song Name']
		.replace(/[^a-zA-Z0-9\s]/g, '')
		.replace(/\s+/g, '-')

	const modifiedJson = {
		id: song.Index,
		author: 'Taylor Swift',
		content: song.Lyrics,
		title: song['Song Name'],
		source: `https://genius.com/Taylor-swift-${modifiedName}-lyrics`,
	}

	const chunks = await textSplitter(modifiedJson)

	const embeddings = await storeDocumentEmbeddings([chunks])
}
