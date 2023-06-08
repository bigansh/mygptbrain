import bcrypt from 'bcrypt'
import randomstring from 'randomstring'

import findUser from '../../user/findUser.js'
import createUser from '../../user/createUser.js'

/**
 * A function that starts the signup process using the generic auth flow
 *
 * @param {import("../../../utils/types/userObject.js").userObject} userObject
 */
const signupAuthFlow = async (userObject) => {
	try {
		const foundUser = await findUser(userObject)

		if (foundUser) {
			throw new Error('User already exists with this particular email.')
		}

		const hash = await bcrypt.hash(userObject.authDetails.password, 10)

		userObject.authDetails.password_salt = hash
		userObject.authDetails.password = null

		const state = randomstring.generate(7)

		const { profile_id } = await createUser(userObject)

		const url = `${process.env.HOST}/auth/callback/login?state=${state}&profile_id=${profile_id}`

		return { state, url }
	} catch (error) {
		throw error
	}
}

export default signupAuthFlow
