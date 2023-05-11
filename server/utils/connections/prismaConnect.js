import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
	log: 'query',
})

export default prisma

export const User = prisma.user
export const Auth = prisma.auth
export const Reddit = prisma.reddit
export const Twitter = prisma.twitter
export const Pocket = prisma.pocket
export const Google = prisma.google
export const Content = prisma.content
