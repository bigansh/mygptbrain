import Redis from 'ioredis'

export default new Redis(process.env.REDISURL, {
    maxRetriesPerRequest: null
})