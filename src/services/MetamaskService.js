import { ethers } from 'ethers';
// Handle Metamask interactions
class MetamaskService {
  async connect(failCallback) {
    try {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.enable();
      this.account = await this.getAccount();
      setInterval(this.listenAccChange.bind(this), 300);
      window.EventEmitter.emit('acc', [this.account])
    } catch(e) {
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
    const acc = await this.getAccount();
    if (acc != null && acc != this.account) {
      this.account = acc;
      window.EventEmitter.emit('acc', [acc])
    }
  }
}

export default MetamaskService;