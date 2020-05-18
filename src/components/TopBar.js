import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import ConnectButton from '../accessories/ConnectButton'
import EthereumIdenticon from '../accessories/EthereumIdenticon'
import StrikeFilter from "../accessories/StrikeFilter"
import AssetPrice from '../accessories/AssetPrice'
import logo from '../assets/logo.png';
import eth from '../assets/ethereum_icon.png';
import '../css/TopBar.css'

const fetch = require('node-fetch')

export default class TopBar extends Component {

    state = {
      account: null
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
        account: acc[0]
      })
    }

    async priceUpdate() {
      const res = await fetch('https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1027&convert=USD', {
          headers: {
              'X-CMC_PRO_API_KEY': 'f294de60-9afd-41fc-ae15-91003ed61ae8'
          }
      })
      const data = await res.json();
      const price = data.data[1027].quote.USD.price
      this.ethAssetPrice.current.updatePrice(price)
    }

    componentWillUnmount() {
      window.EventEmitter.removeListener('acc')
      window.EventEmitter.removeListener('price_update')
    }

    render() {
      if (this.state.account === null)
        return (
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
                        <AssetPrice icon = {eth} name="" ref={this.ethAssetPrice}/>
                        
                        </li>
                        <li>
                          <StrikeFilter/>
                        </li>
                    </ul>
                </div>
            <Navbar.Collapse className="justify-content-end">
                <ConnectButton metamaskService={this.metamaskService}/>
            </Navbar.Collapse>
          </Navbar>
        )
      else 
        return (
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
                    </ul>
                </div>
            <Navbar.Collapse className="justify-content-end">
                <StrikeFilter/>
                <EthereumIdenticon address={this.state.account}/>
            </Navbar.Collapse>
          </Navbar>
      )
      }
}