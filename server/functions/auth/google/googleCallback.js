import { google } from 'googleapis'

import googleClient from '../../../utils/api/google.js'

const userFinderAndUpdater = require('../../lifecycle/userFinderAndUpdater')

/**
 * A function that handles the callback request for Google
 *
 * @param {String} sessionState
 * @param {String} state
 * @param {String} code
 * @param {String} profile_id
 */
const googleCallback = async (
	sessionState,
	state,
	code,
	profile_id = undefined
) => {
	try {
		if (!state || !sessionState || !code)
			throw new Error('You denied the app or your session expired!')

		if (state !== sessionState)
			throw new Error("Stored tokens didn't match!")

		const { tokens } = await googleClient.getToken(code)

		googleClient.setCredentials(tokens)

		const { data } = await google
			.people({
				version: 'v1',
				auth: googleClient,
			})
			.people.get({
				resourceName: 'people/me',
				personFields: 'names,emailAddresses,photos',
			})

		const google_id = data.resourceName.match('[0-9]+$')[0]

		const userObject = {
			name: data.names[0].displayName,
			google_id: google_id,
			email: data.emailAddresses[0].value,
			google_auth_tokens: {
				access_token: tokens.access_token,
				refresh_token: tokens.refresh_token,
			},
		}

		const user = await userFinderAndUpdater(profile_id, userObject)

		return user
	} catch (error) {
		throw error
	}
}

export default googleCallback
