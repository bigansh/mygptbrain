import { Chat } from '../../utils/initializers/prisma.js'

/**
 * A function to find all the chats of a user
 *
 * @param {import("../../utils/types/chatQueryObject").chatQueryObject} query
 */
const findChats = async (query) => {
	try {
		return await Chat.findMany({ where: query })
	} catch (error) {
		throw error
	}
}

export default findChats
