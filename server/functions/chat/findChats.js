import { Chat } from '../../utils/initializers/prisma.js'

/**
 * A function to find all the chats of a user
 *
 * @param {import("../../utils/types/chatQueryObject").chatQueryObject} chatQueryObject
 * @param {Boolean} wantPref
 * @param {Object} selectObject
 * @param {Boolean} wantPrompts
 */
const findChats = async (
	chatQueryObject,
	wantPref = false,
	selectObject = undefined,
	wantPrompts = undefined
) => {
	try {
		if (selectObject)
			return await Chat.findMany({
				where: chatQueryObject,
				select: { preferences: wantPref, ...selectObject },
			})
		else
			return await Chat.findMany({
				where: chatQueryObject,
				include: {
					preferences: wantPref,
					user: {
						select: {
							userMetadata: {
								select: { prompt_templates: wantPrompts },
							},
						},
					},
				},
			})
	} catch (error) {
		throw error
	}
}

export default findChats
