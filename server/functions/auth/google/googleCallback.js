import { google } from 'googleapis'

import googleClient from '../../../utils/api/google.js'

import userFinderAndUpdater from '../../lifecycle/userFinderOrUpdater.js'
import authFinderAndUpdater from '../../lifecycle/authFinderOrUpdater.js'

/**
 * A function that handles the callback request for Google
 *
 * @param {String} state
 * @param {String} code
 * @param {import('../../../utils/types/authObjects.js').authObjects} authObjects
 */
const googleCallback = async (state, code, { state: sessionState, profile_id }) => {
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

		/**
		 * @type {import('../../../utils/types/userObject.js').userObject}
		 */
		let userObject = {
			personalDetails: {
				name: data.names[0].displayName,
				email: data.emailAddresses[0].value,
				profile_id: profile_id
			},
			authDetails: {
				google_id: google_id,
			},
			googleTokens: {
				access_token: tokens.access_token,
				refresh_token: tokens.refresh_token,
			},
		}

		const user = await userFinderAndUpdater(userObject)

		userObject.personalDetails.profile_id = user.dataValues.profile_id

		await authFinderAndUpdater(userObject)

		return user
	} catch (error) {
		throw error
	}
}

export default googleCallback
