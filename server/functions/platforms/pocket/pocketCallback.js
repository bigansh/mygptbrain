import axios from 'axios'

import pocketClient from '../../../utils/api/pocket.js'

import userFinderAndUpdater from '../../lifecycle/userFinderOrUpdater.js'
import authFinderAndUpdater from '../../lifecycle/authFinderOrUpdater.js'

/**
 * A function that handles the callback request for Pocket
 * 
 * @param {String} state
 * @param {String} code
 * @param {import('../../../utils/types/authObject.js').authObject} authObject
 */
const pocketCallback = async (
	state,
	code,
	{ state: sessionState, profile_id }
) => {
	try {
		if (!state || !sessionState || !code)
			throw new Error('You denied the app or your session expired!')

		if (state !== sessionState)
			throw new Error("Stored tokens didn't match!")

		const { data, headers } = pocketClient(code)

		const authData = await axios.post(
			'https://getpocket.com/v3/oauth/authorize',
			data,
			{
				headers: headers,
			}
		)

		/**
		 * @type {import('../../../utils/types/userObject.js').userObject}
		 */
		const userObject = {
			personalDetails: {
				profile_id: profile_id,
			},
			authDetails: {
				pocket_id: authData.data.username,
			},
			pocketTokens: {
				access_token: authData.data.access_token,
			},
		}

		const user = await userFinderAndUpdater(userObject)

		await authFinderAndUpdater(userObject)

		return user
	} catch (error) {
		throw error
	}
}

export default pocketCallback