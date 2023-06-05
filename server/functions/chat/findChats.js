import { Chat } from '../../utils/initializers/prisma.js'

/**
 * A function to find all the chats of a user
 *
 * @param {import("../../utils/types/chatQueryObject").chatQueryObject} chatQueryObject
 * @param {Boolean} wantPref
 */
const findChats = async (chatQueryObject, wantPref = undefined) => {
	try {
		return await Chat.findMany({
			where: chatQueryObject,
			include: { preferences: wantPref },
		})
	} catch (error) {
		throw error
	}
}

export default findChats
