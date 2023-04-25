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

import postgreConnect from './utils/connections/postgreConnect.js'

await postgreConnect()

import helmet from '@fastify/helmet'
import cors from '@fastify/cors'

app.register(helmet, {
	global: true,
})
app.register(cors, {
	credentials: true,
	strictPreflight: false,
	methods: ['GET', 'POST', 'PATCH', 'DELETE'],
	origin: [process.env.CLIENT, 'http://localhost:8080'],
})

import auth from './routes/auth.js'

app.register(auth, { prefix: '/auth' })

app.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' }, (error) => {
	if (error) throw error

	console.log(`Listening on ${process.env.PORT || 3000}!`)
})
