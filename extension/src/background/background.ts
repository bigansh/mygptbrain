import { scrapeLink, getUser, getLinks } from '../components/API'
import {
	getStoredLinks,
	getStoredOptions,
	getStoredUser,
	setStoredLinks,
	setStoredOptions,
	setStoredUser,
} from '../utils/storage'

chrome.runtime.onInstalled.addListener(async () => {
	function checkCookie() {
		return new Promise((resolve, reject) => {
			chrome.cookies.get(
				{
					url: 'https://mygptbrain.com/',
					name: 'x-session-token',
				},
				(cookie) => {
					if (chrome.runtime.lastError) {
						reject(chrome.runtime.lastError)
					} else {
						resolve(cookie)
					}
				}
			)
		})
	}

	try {
		const cookie = await checkCookie()

		if (!cookie) {
			chrome.tabs.create({
				url: 'https://mygptbrain.com/onboarding',
			})
		} else {
			setStoredUser({})
			setStoredLinks([])
			chrome.action.setBadgeBackgroundColor({ color: '#50C878' })

			const user = await getUser().then((res) => res.json())

			const links = await getLinks({ profileId: user.profile_id }).then(
				(res) => res.json()
			)
			setStoredUser(user)
			setStoredLinks(
				links.filter((link) => link.documentMetadata.url !== null)
			)
		}
	} catch (err) {
		console.error(err)
	}
})

chrome.runtime.onMessage.addListener(async (res) => {
	// opens on extension icon click
	// this runtime gets message from the tab icon (popup.tsx)
	const { tab } = res.payload

	if (res.message === 'ADD_TO_DOCUMENTS') {
		try {
			const user = await getStoredUser()

			// if (user?.userMetadata?.subscription_status) {
			//   const links = await getStoredLinks()
			//   if (links.length >= 2) {
			//     chrome.runtime.sendMessage({
			//       msg: "ERROR",
			//       data: {
			//         subject: "pay",
			//       }
			//     });
			//     return; // This will now correctly exit the outer function
			//   }
			// }

			const link = await scrapeLink(tab.url).then((res) => res.json())

			if (!link.error) {
				getStoredLinks().then((links: any) => {
					setStoredLinks([...links, link])
				})

				if (
					link.user.userMetadata.subscription_status !==
					// @ts-ignore
					user?.userMetadata?.subscription_status
				) {
					setStoredUser({
						// @ts-ignore
						...user,
						userMetadata: { ...link.user.userMetadata },
					})
				}
				chrome.action.setBadgeText({ text: ' ', tabId: tab.id })
				chrome.action.setBadgeBackgroundColor({ color: '#50C878' })
			} else {
				if (link.message == 'User is not authorized.') {
					chrome.runtime.sendMessage({
						msg: 'ERROR',
						data: {
							subject: 'pay',
						},
					})
				} else {
					chrome.runtime.sendMessage({
						msg: 'ERROR',
						data: {
							subject: 'error',
							content: 'Error bookmarking the page.',
						},
					})
				}
			}
		} catch (err) {
			// if(err.message == '"message": "User is not authorized"')
			chrome.runtime.sendMessage({
				msg: 'ERROR',
				data: {
					subject: 'error',
					content: 'Something went wrong.',
				},
			})
		}
	}
})
//fires on tab change
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
	const tab = await getCurrentTab(tabId)
	const links: any = await getStoredLinks()

	const isCurrentTabBookmarked = links.find(
		(e) => e.documentMetadata.url == tab.url
	)
	if (isCurrentTabBookmarked) {
		chrome.action.setBadgeText({ text: ' ', tabId: tab.id })
	}
})

//fires on internal url change
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	if (changeInfo.status == 'complete') {
		const links: any = await getStoredLinks()
		console.log(links)
		const isCurrentTabBookmarked = links.find(
			(e) => e.documentMetadata.url == tab.url
		)
		if (isCurrentTabBookmarked) {
			chrome.action.setBadgeText({ text: ' ', tabId: tab.id })
		}
	}
})

async function getCurrentTab(tabId) {
	let tab = await chrome.tabs.get(tabId)
	return tab
}
