import * as dotenv from 'dotenv'

dotenv.config()

import fastify from 'fastify'
import pino from 'pino'
import logtail from '@logtail/pino'

const app = fastify({
	logger: pino({
		level: 'trace',
		transport: {
			targets: [
				{
					target: '@logtail/pino',
					options: { sourceToken: process.env.LOGTAIL_TOKEN },
				},
				{
					target: 'pino-pretty',
					options: { colorize: true },
				},
			],
		},
	}),
})

import helmet from '@fastify/helmet'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import rateLimit from '@fastify/rate-limit'

await app.register(rateLimit, { global: false })
app.register(multipart, { limits: { fileSize: 10 * 1024 * 1024, files: 1 } })
app.register(helmet, { global: true })
app.register(cors, {
	credentials: true,
	methods: ['GET', 'POST', 'PATCH', 'DELETE'],
	origin: [
		process.env.CLIENT,
		'http://localhost:3001',
		'http://localhost:3000',
		process.env.EXTENSION,
	],
})

app.setNotFoundHandler({
	preHandler: app.rateLimit({ max: 0, timeWindow: 1000 }),
})

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
import user from './routes/user.js'
import chat from './routes/chat.js'
import persona from './routes/persona.js'

app.register(auth, { prefix: '/auth' })
app.register(document, { prefix: '/document' })
app.register(chat, { prefix: '/chat' })
app.register(user, { prefix: '/user' })
app.register(persona, { prefix: '/persona' })

app.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' }, (error) => {
	if (error) {
		throw error
	}

	console.log(`Listening on ${process.env.PORT || 3000}!`)
})
