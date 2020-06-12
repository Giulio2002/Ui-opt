import TimeTable from './timeDict'
import {ethers} from 'ethers'

export default (rawAh, address) => {
    const timestamp = Math.floor(Date.now() / 1000)
    rawAh = rawAh.filter((option) => {
      return option.price_in.length > 18
    })
    rawAh = rawAh.filter((option) => {
      return option.price_out.length > 18
    })
    rawAh = rawAh.filter((option) => {
      return option.lock.length > 15
    })
    return rawAh.map(option => {
      option.lock = parseFloat(ethers.utils.formatEther(option.lock));
      option.price_in = Math.round(parseInt(option.price_in, 10) / 10**18)
      option.price_out = Math.round(parseInt(option.price_out, 10) / 10**18)
      option.price_in = Math.round(option.price_in * 1000) / 1000
      const until = parseInt(option.until, 10)
      const s = option.status

      if (option.origin === address) {
        option.position = "Sell"
      } else {
        option.position = "Buy"
      }

      if (option.status === "Avaible")  {
          option.status = "On Sale"
      } else if (option.status === "Expired") {
        option.status = "Expired and Returned"
      } else if (option.status === "Purchased" && option.position === "Sell") {
        option.status = "Sold and Pending"
      }

      option.expire = TimeTable[option.expire]
      if (s !== "Avaible") {
        option.until = "Terminated"
        return option
      }

      let delta = Math.abs(until - timestamp);
      // days
      const days = Math.floor(delta / 86400);
      delta -= days * 86400;

      // hours
      const hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      // calculate (and subtract) whole minutes
      let minutes = Math.floor(delta / 60) % 60;
      if (minutes === 0 && hours === 0 && days === 0)
        minutes = 1
      option.until = `${days} days, ${hours} hours, ${minutes} minutes`
      
      return option
    })
}