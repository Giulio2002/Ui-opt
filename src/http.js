import config from './config'
const fetch = require('node-fetch')

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