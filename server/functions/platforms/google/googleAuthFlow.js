import randomstring from 'randomstring'

import googleClient from '../../../utils/api/google.js'

/**
 * A function to handle the 3-legged authentication for Google
 *
 * @param {String} query_type
 */
const googleAuthFlow = (query_type) => {
	try {
		const state = randomstring.generate(7)

		let scopes = [
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/userinfo.profile',
		]

		if (query_type === 'keep')
			scopes = [
				...scopes,
				'https://www.googleapis.com/auth/keep',
				'https://www.googleapis.com/auth/keep.readonly',
			]

		const url = googleClient.generateAuthUrl({
			access_type: 'offline',
			scope: scopes,
			state: state,
		})

		return { url, state }
	} catch (error) {
		throw error
	}
}

export default googleAuthFlow