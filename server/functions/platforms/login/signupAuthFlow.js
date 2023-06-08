import bcrypt from 'bcrypt'

import findUser from '../../user/findUser.js'
import createUser from '../../user/createUser.js'

/**
 * A function that starts the signup process using the generic auth flow
 *
 * @param {import("../../../utils/types/userObject.js").userObject} userObject
 */
const signupAuthFlow = async (userObject) => {
	try {
		console.log(userObject)

		const foundUser = await findUser({
			personalDetails: { email: userObject.personalDetails.email },
		})

		if (foundUser) {
			throw new Error('User already exists with this particular email.')
		}

		const hash = await bcrypt.hash(userObject.authDetails.password, 10)

		userObject.authDetails.password_salt = hash
		userObject.authDetails.password = undefined

		const { profile_id } = await createUser(userObject)

		return { profile_id }
	} catch (error) {
		throw error
	}
}

export default signupAuthFlow
