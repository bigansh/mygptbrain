import axios from 'axios'

import { notionAuthorizationClient } from '../../../utils/api/notion.js'

import authFinderAndUpdater from '../../lifecycle/authFinderOrUpdater.js'
import findUser from '../../user/findUser.js'

/**
 * A function to handle the authorization callback for Notion
 *
 * @param {String} state
 * @param {String} code
 * @param {import("../../../utils/types/authObject").authObject} authObject
 */
const notionCallback = async (
	state,
	code,
	{ state: sessionState, profile_id }
) => {
	try {
		if (!state || !sessionState || !code)
			throw new Error('You denied the app or your session expired!')

		if (state !== sessionState)
			throw new Error("Stored tokens didn't match!")

		const { data, headers } = notionAuthorizationClient(code)

		const authData = await axios.post(
			'https://api.notion.com/v1/oauth/token',
			data,
			{ headers: headers }
		)

		/**
		 * @type {import('../../../utils/types/userObject.js').userObject}
		 */
		let userObject = {
			personalDetails: {
				profile_id: profile_id,
			},
			authDetails: {
				notion_id: authData.data.bot_id,
			},
			notionTokens: {
				access_token: authData.data.access_token,
				workspace_id: authData.data.workspace_id,
			},
		}

		const user = await findUser(userObject)

		await authFinderAndUpdater(userObject)

		return user
	} catch (error) {
		throw error
	}
}

export default notionCallback
