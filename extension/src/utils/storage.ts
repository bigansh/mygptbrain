export function setStoredUser(user): Promise<void> {
    const vals = { user }
    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve()
        })
    })
}

export function getStoredUser() {
    const keys = ['user']
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res) => {
            resolve(res.user)
        })
    })
}

export function setStoredLinks(links): Promise<void> {
    const vals = { links }

    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve()
        })
    })
}

export function getStoredLinks() {
    const keys = ['links']
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res) => {
            resolve(res.links)
        })
    })
}


export function setStoredOptions(options): Promise<void> {
    const vals = { options }

    return new Promise((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve()
        })
    })
}

export function getStoredOptions() {
    const keys = ['options']
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res) => {
            resolve(res.options)
        })
    })
}