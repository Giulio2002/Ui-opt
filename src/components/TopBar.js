import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import ConnectButton from '../accessories/ConnectButton'
import EthereumIdenticon from '../accessories/EthereumIdenticon'
import StrikeFilter from "../accessories/StrikeFilter"
import AssetPrice from '../accessories/AssetPrice'
import logo from '../assets/logo.png';
import eth from '../assets/ethereum_icon.png';
import '../css/TopBar.css'
import ModalFail from '../accessories/ModalFail'
import config from '../config'
const fetch = require('node-fetch')

export default class TopBar extends Component {

    state = {
      account: null,
      showModal: false
    }

    constructor(props) {
      super(props)
      this.ethAssetPrice = React.createRef();
      this.metamaskService = this.props.metamaskService;
    }

    componentDidMount() {
      setTimeout(this.priceUpdate.bind(this), 200)
      setInterval(this.priceUpdate.bind(this), 15000)
      window.EventEmitter.on('acc', this.onAccountChange.bind(this))
    }

    onAccountChange(acc) {
      this.setState({
        account: acc[0],
        showModal: this.state.showModal
      })
    }

    onMetamaskFail() {
      this.setState({
        account: this.state.account,
        showModal: true
      })
    }

    async priceUpdate() {
      const res = await fetch('https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1027&convert=USD', {
          headers: {
              'X-CMC_PRO_API_KEY': config.API_KEY
          }
      })

      const data = await res.json();
      const price = data.data[1027].quote.USD.price
      this.ethAssetPrice.current.updatePrice(price)
    }

    onHideFailModal() {
      this.setState({
        account: this.state.account,
        showModal: false
      })
    }

    componentWillUnmount() {
      window.EventEmitter.removeListener('acc')
      window.EventEmitter.removeListener('price_update')
    }

    render() {
      if (this.state.account === null)
        return (
          <>
          <Navbar bg="dark" variant="topbar" fixed="top">
            <Navbar.Brand>
              <img
                src={logo}
                className="d-inline-block align-top logo"
              />
            </Navbar.Brand>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                          <AssetPrice icon = {eth} name="Ethereum" ref={this.ethAssetPrice}/>
                        </li>
                        <li>
                          <StrikeFilter/>
                        </li>
                    </ul>
                </div>
            <Navbar.Collapse className="justify-content-end">
                <ConnectButton metamaskService={this.metamaskService} onFail={this.onMetamaskFail.bind(this)}/>
            </Navbar.Collapse>
          </Navbar>
          <ModalFail
            show={this.state.showModal} 
            onHide={this.onHideFailModal.bind(this)} 
            h="Error while connecting to Metamask"
            b="There seems to be an error while connecting to your wallet!"
          />          
        </>
        )
      else 
        return (
          <>
          <Navbar bg="dark" variant="topbar" fixed="top">
            <Navbar.Brand>
              <img
                src={logo}
                className="d-inline-block align-top logo"
              />
            </Navbar.Brand>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                          <AssetPrice icon = {eth} name="Ethereum" ref={this.ethAssetPrice}/>
                        </li>
                        <li>
                          <StrikeFilter/>
                        </li>
                    </ul>
                </div>
            <Navbar.Collapse className="justify-content-end">
                <EthereumIdenticon address={this.state.account}/>
            </Navbar.Collapse>
          </Navbar>
          <ModalFail
            show={this.state.showModal} 
            onHide={this.onHideFailModal.bind(this)} 
            h="Error while connecting to Metamask"
            b="There seems to be an error with Connecting to your wallet!"
          />
          </>
      )
      }
}