import randomstring from 'randomstring'

import googleClient from '../../../utils/api/google.js'

/**
 * A function to handle the 3-legged authentication for Google
 *
 * @param {String} query_type
 */
const googleAuthFlow = (query_type) => {
	const state = randomstring.generate(7)

	let scopes = [
		'https://www.googleapis.com/auth/userinfo.email',
		'https://www.googleapis.com/auth/userinfo.profile',
	]

	let authenticatedScopes = ['basic']

	if (query_type === 'keep') {
		scopes = [...scopes, 'https://www.googleapis.com/auth/keep.readonly']

		authenticatedScopes = [...authenticatedScopes, 'keep']
	}
	if (query_type === 'drive') {
		scopes = [
			...scopes,
			'https://www.googleapis.com/auth/drive.metadata.readonly',
			'https://www.googleapis.com/auth/drive.readonly',
			// 'https://www.googleapis.com/auth/drive.file',
		]

		authenticatedScopes = [...authenticatedScopes, 'drive']
	}

	const url = googleClient.generateAuthUrl({
		access_type: 'offline',
		scope: scopes,
		state: state,
	})

	return { url, state, authenticatedScopes }
}

export default googleAuthFlow
