import { ethers } from 'ethers';
import config from '../config'
const Pivot = require('../abi/NativePivot2.json')
const ERC20 = require('../abi/ERC20.json')

// Handle Metamask interactions
class MetamaskService {
  expectedId = 3

  async connect(failCallback) {
    try {
      
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.enable();
      const network = await this.provider.getNetwork()
      if (network.chainId !== this.expectedId) {
        throw 'Invalid Network: Please select Ropsten'
      }
      this.account = await this.getAccount();
      this.pivot = new ethers.Contract(config.PIVOT_ADDRESS, Pivot.abi, this.provider.getSigner(0)) 
      this.token = new ethers.Contract(config.TOKEN_ADDRESS, ERC20.abi, this.provider.getSigner(0)) 
      setInterval(this.listenAccChange.bind(this), 700);
      window.EventEmitter.emit('acc', [this.account])
    } catch(e) {
      console.log(e)
      failCallback()
    }
  }

  getProvider() {
    return this.provider;
  }

  async getAccount() {
    if (!this.provider) {
      return null
    }
    const accounts = await this.provider.listAccounts()
    return accounts[0];
  }

  address() {
    return this.account;
  }

  async listenAccChange() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    const acc = await this.getAccount();
    const network = await this.provider.getNetwork()
    if (network.chainId !== this.expectedId) {
      window.location.reload()
    }
    if (acc !== null && acc !== this.account) {
      this.account = acc;
      this.pivot = new ethers.Contract(config.PIVOT_ADDRESS, Pivot.abi, this.provider.getSigner(0)) 
      window.EventEmitter.emit('acc', [acc])
    }
  }

  getPivot() {
    return this.pivot;
  }

  getToken() {
    return this.token
  }

  getBalance() {
    return this.provider.getBalance(this.address())
  }

  getTokenBalance() {
    return this.token.balanceOf(this.address())
  }
}

export default MetamaskService;