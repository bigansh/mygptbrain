import { v4 as uuidV4 } from 'uuid'

import { User, Auth } from '../../../../utils/connections/postgreConnect.js'

/**
 * A function to create the user object
 *
 * @param {import('../../../../utils/types/userObject.js').userObject} userObject
 */
const createUser = async ({ authDetails, personalDetails }) => {
	try {
		const profile_id = uuidV4()

		const user = await User.create({
			...personalDetails,
			profile_id: profile_id,
		})

		await Auth.create({ ...authDetails, profile_id: profile_id })

		return user
	} catch (error) {
		throw error
	}
}

export default createUser
