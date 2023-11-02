import 'dotenv/config.js'

import csv from 'csvtojson'

import textSplitter from './functions/textSplitter.js'
import storeDocumentEmbeddings from './functions/storeDocumentEmbeddings.js'

const pgBlogs = await csv().fromFile(
	'/Users/bigansh/Programming/myGPTBrain/helpers/personas/data/pg.csv'
)

for await (const blog of pgBlogs) {
	const chunks = await textSplitter(blog)

	const embeddings = await storeDocumentEmbeddings(chunks)
}
