import { PrismaClient } from '@prisma/client'
// import { createPrismaRedisCache } from 'prisma-redis-middleware'

// import redis from '../api/redis.js'

const prisma = new PrismaClient({ log: ['query'] })

// const cacheMiddleware = createPrismaRedisCache({
// 	models: [
// 		{ model: 'User', cacheTime: 60 },
// 		{ model: 'Document', cacheTime: 60 },
// 		{ model: 'Chat', cacheTime: 60 },
// 	],
// 	storage: { type: 'memory', options: { invalidation: true, log: console } },
// 	cacheTime: 300,
// 	onError: (key) => {
// 		throw new Error('Error caching on Redis.')
// 	},
// })

// prisma.$use(cacheMiddleware)

export default prisma

export const User = prisma.user
export const userMetadata = prisma.userMetadata
export const Auth = prisma.auth
export const Reddit = prisma.reddit
export const Notion = prisma.notion
export const Twitter = prisma.twitter
export const Pocket = prisma.pocket
export const Google = prisma.google
export const Document = prisma.document
export const DocumentMetadata = prisma.documentMetadata
export const Chat = prisma.chat
export const ChatPreferences = prisma.chatPreferences
