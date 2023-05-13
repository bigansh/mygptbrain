import * as dotenv from 'dotenv'

dotenv.config()

import fastify from 'fastify'
import pino from 'pino'

const app = fastify({
	logger: pino({
		level: 'trace',
		transport: {
			target: 'pino-pretty',
			options: { colorize: true },
		},
	}),
})

import helmet from '@fastify/helmet'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'

app.register(helmet, {
	global: true,
})
app.register(cors, {
	credentials: true,
	strictPreflight: false,
	methods: ['GET', 'POST', 'PATCH', 'DELETE'],
	origin: [process.env.CLIENT, 'http://localhost:5000'],
})
app.register(multipart)

import jwt from './utils/plugins/jwt.js'

app.register(jwt)

import clientAuth from './utils/decorators/clientAuth.js'
import callbackAuth from './utils/decorators/callbackAuth.js'
import userAuth from './utils/decorators/userAuth.js'

app.register(clientAuth)
app.register(callbackAuth)
app.register(userAuth)

import auth from './routes/auth.js'
import document from './routes/document.js'
import chat from './routes/chat.js'

app.register(auth, { prefix: '/auth' })
app.register(document, { prefix: '/document' })
app.register(chat, { prefix: '/chat' })

app.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' }, (error) => {
	if (error) throw error

	console.log(`Listening on ${process.env.PORT || 3000}!`)
})
