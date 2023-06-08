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

		const state = randomstring.generate(7)

		const url = `${process.env.HOST}/auth/callback/login?state=${state}&profile_id=${foundUser.profile_id}`

		return { state, url }
	} catch (error) {
		throw error
	}
}

export default loginAuthFlow
