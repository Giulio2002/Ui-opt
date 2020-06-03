import config from './config'

const fetch = require('node-fetch')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
async function waitUntil(fn, time) {
    while (!await fn()) {
        await sleep(time)
    }
}
export const getUsable = async (address, currExpire) => {
    let res
    if (address) {
        res = await fetch(config.PIVOT_API + '/usable/' + currExpire + '/' + address)
    } else {
        res = await fetch(config.PIVOT_API + '/expire/' + currExpire)
    }
    return res.json()
}

export const getPast = async (address) => {
    let res
    if (address) {
        res = await fetch(config.PIVOT_API + '/past/' + address)
    } else {
        res = await fetch(config.PIVOT_API + '/past/' + address)
    }
    return res.json()
}

export const getPresent = async (address) => {
    let res
    if (address) {
        res = await fetch(config.PIVOT_API + '/present/' + address)
    } else {
        res = await fetch(config.PIVOT_API + '/present/' + address)
    }
    return res.json()
}

export const getOption = async (id) => {
    let res = await fetch(config.PIVOT_API + '/id/' + id)
    return res.json()
}

export const untilJoin = async (id) => {
    await waitUntil(async () => {
        try {
            const option = await getOption(id)
            return option.status
        } catch(e) {
            return false
        }
      }, 2000)
}

export const untilBuy = async (id) => {
    await waitUntil(async () => {
        const option = await getOption(id)
        return option.status === "Purchased"
      }, 600)
}

export const untilClaim = async (id) => {
    await waitUntil(async () => {
        const option = await getOption(id)
        console.log(option)
        return option.status === "Claimed"
      }, 600)
}

export const untilRetire = async (id) => {
    await waitUntil(async () => {
        const option = await getOption(id)
        return option.status === "Retired"
      }, 600)
}