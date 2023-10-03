import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient({ log: ['query'] }).$extends(withAccelerate())

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
