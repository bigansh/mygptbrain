import { Chat } from '../../utils/initializers/prisma.js'

/**
 * A function to find all the chats of a user
 *
 * @param {import("../../utils/types/chatQueryObject").chatQueryObject} query
 * @param {Boolean} wantPref
 */
const findChats = async (query, wantPref = undefined) => {
	try {
		return await Chat.findMany({
			where: query,
			include: { preferences: wantPref },
		})
	} catch (error) {
		throw error
	}
}

export default findChats
