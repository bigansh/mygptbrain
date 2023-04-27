/**
 * A function that returns the appropriate data and headers for Pocket
 * 
 * @param {String} code 
 * @param {String} access_token 
 */
const pocketClient = (code = undefined, access_token = undefined) => {
	if (code)
		return {
			data: {
				consumer_key: process.env.POCKET_ID,
				code: code,
			},
			headers: {
				'user-agent': 'myGPTBrain',
				'content-type': 'application/json; charset=UTF-8',
				'x-accept': 'application/json',
			},
		}
	else if (access_token)
		return {
			data: {
				consumer_key: process.env.POCKET_ID,
				access_token: access_token,
			},
			headers: {
				'user-agent': 'myGPTBrain',
				'content-type': 'application/json; charset=UTF-8',
				'x-accept': 'application/json',
			},
		}
}

export default pocketClient
