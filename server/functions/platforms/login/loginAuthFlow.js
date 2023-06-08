import bcrypt from 'bcrypt'

import findUser from '../../user/findUser.js'

/**
 * A function that starts the signup process using the generic auth flow
 *
 * @param {import("../../../utils/types/userObject.js").userObject} userObject
 */
const loginAuthFlow = async (userObject) => {
	try {
		const foundUser = await findUser({
			personalDetails: userObject.personalDetails,
		})

		if (!foundUser) {
			throw new Error('No such user exists.')
		}

		const result = await bcrypt.compare(
			userObject.authDetails.password,
			foundUser.auth.password_salt
		)

		if (!result) throw new Error('Incorrect password!')

		return { profile_id: foundUser.profile_id }
	} catch (error) {
		throw error
	}
}

export default loginAuthFlow
