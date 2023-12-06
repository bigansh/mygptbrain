const BASEURL = 'https://mygptbrain.com'

async function getSessionTokenCookie() {
	return new Promise((resolve, reject) => {
		chrome.cookies.get(
			{
				url: 'https://mygptbrain.com/',
				name: 'x-session-token',
			},
			(cookie) => {
				if (cookie) {
					resolve(cookie.value)
				} else {
					reject(new Error('Failed to retrieve cookie.'))
				}
			}
		)
	})
}

const getLinks = async ({ profileId }) => {
	const sessionToken = await getSessionTokenCookie()
	const response = await fetch(`${BASEURL}/document/read`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${sessionToken}`,
		},
		body: JSON.stringify({
			documentQueryObject: {
				profile_id: profileId,
			},
		}),
	})
	return response
}

const getUser = async () => {
	const sessionToken = await getSessionTokenCookie()
	const response = await fetch(`${BASEURL}/user/read`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${sessionToken}`,
		},
	})
	return response
}

const scrapeLink = async (url) => {
	const sessionToken = await getSessionTokenCookie()
	const response = await fetch(
		`${BASEURL}/document/create?query_type=scrape`,
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${sessionToken}`,
			},
			body: JSON.stringify({
				documentQueryObject: {
					documentMetadata: {
						url,
					},
				},
			}),
		}
	)
	return response
}

export { getUser, scrapeLink, getLinks }
