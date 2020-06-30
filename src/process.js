import TimeTable from './timeDict'
import config from './config'
import {ethers} from 'ethers'

export function parse (rawAh, address, pos=false) {
  return rawAh.map(option => {
    console.log(option.lock)
    if (!pos || option.address === option.origin)
      option.lock = parseFloat(ethers.utils.formatEther(option.lock));
    else 
      option.lock = parseFloat(ethers.utils.formatEther(option.credit));
    option.ask = parseInt(option.price_in, 10)
    option.strike = parseInt(option.price_out, 10)
    if (option.origin === address) {
      option.position = "Sell"
    } else {
      option.position = "Buy"
    }

    if (option.status === "Avaible")  {
        option.status = "On Sale"
    } else if (option.status === "Expired") {
      option.lock = parseFloat(ethers.utils.formatEther(option.origin_lock));
      option.status = "Expired and Returned"
    } else if (option.status === "Purchased" && option.position === "Sell") {
      option.status = "Sold and Pending"
    }

    if (option.status === "Claimed" || option.status === "Closed" || option.status === "Retired") 
      option.lock = parseFloat(ethers.utils.formatEther(option.origin_lock));

    console.log(option.origin_lock)
    option.expire = TimeTable[option.expire]

    return option
  })
}
export function process (rawAh, address) {
  const parsedList = parse(rawAh, address)
  const strikes = config.strikes
  let divid = []
  // Initialize Divid
  strikes.forEach(() => {
    divid.push([])
  })
  // Distribution
  parsedList.forEach((e) => {
    let posInStrikes = strikes.indexOf(parseInt(e.strike, 10))
    if (posInStrikes === -1) return
    divid[posInStrikes].push(e)
  })
  // Sorting
  divid.forEach((_, i) => {
    divid[i].sort((a, b) => {return a.ask-b.ask})
  })
  return divid
}