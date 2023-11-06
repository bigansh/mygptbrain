import { scrapeLink, getUser, getLinks } from "../components/API"
import { getStoredLinks, getStoredOptions, setStoredLinks, setStoredOptions, setStoredUser } from "../utils/storage"


chrome.runtime.onInstalled.addListener(async () => {

  function checkCookie() {
    return new Promise((resolve, reject) => {
      chrome.cookies.get({
        url: "https://testing.mygptbrain.com/",
        name: "x-session-token",
      }, (cookie) => {

        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(cookie);
        }
      });
    });
  }

  try {
    const cookie = await checkCookie();

    if (!cookie) {

      chrome.tabs.create({ url: 'https://testing.mygptbrain.com/onboarding/login' });
    } else {

      setStoredUser({});
      setStoredLinks([]);
      chrome.action.setBadgeBackgroundColor({ color: '#50C878' });

      const user = await getUser().then(res => res.json());

      const links = await getLinks({ profileId: user.profile_id }).then(res => res.json());
      console.log(links)
      setStoredUser(user);
      setStoredLinks(links.filter(link => link.documentMetadata.url !== null));
    }
  } catch (err) {
    console.log(err, "Error checking cookie or fetching user data");
  }
});

chrome.runtime.onMessage.addListener(
  async (res) => {
    // opens on extension icon click
    // this runtime gets message from the tab icon (popup.tsx)
    const { tab } = res.payload

    if (res.message === 'ADD_TO_DOCUMENTS') {
      chrome.action.setBadgeText({ text: ' ', tabId: tab.id });
      chrome.action.setBadgeBackgroundColor(
        { color: '#50C878' },
      );

      try {
        const link = await scrapeLink(tab.url).then(res => res.json()).catch(err => console.log(err, 'here'))
        getStoredLinks().then((links: any) => {
          setStoredLinks([...links, link])
        })

      } catch (err) {
        console.log(err, "err user");
      }
    }
  })
//fires on tab change
chrome.tabs.onActivated.addListener(

  async ({ tabId }) => {
    const tab = await getCurrentTab(tabId)
    const links: any = await getStoredLinks()
    console.log(links)
    const isCurrentTabBookmarked = links.find(e => e.documentMetadata.url == tab.url)
    if (isCurrentTabBookmarked) {
      chrome.action.setBadgeText({ text: ' ', tabId: tab.id });
    }
  }

)

//fires on internal url change
chrome.tabs.onUpdated.addListener(
  async (tabId, changeInfo, tab) => {
    if (changeInfo.status == "complete") {
      const links: any = await getStoredLinks()
      console.log(links)
      const isCurrentTabBookmarked = links.find(e => e.documentMetadata.url == tab.url)
      if (isCurrentTabBookmarked) {
        chrome.action.setBadgeText({ text: ' ', tabId: tab.id });
      }
    }
  },
)


async function getCurrentTab(tabId) {
  let tab = await chrome.tabs.get(tabId)
  return tab;
}

