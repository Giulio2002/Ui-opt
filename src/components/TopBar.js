import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import ConnectButton from '../accessories/ConnectButton'
import EthereumIdenticon from '../accessories/EthereumIdenticon'
import logo from '../assets/logo.png';
import '../css/TopBar.css'
import ModalFail from '../accessories/ModalFail'

export default class TopBar extends Component {

    state = {
      account: null,
      showModal: false
    }

    constructor(props) {
      super(props)
      this.metamaskService = this.props.metamaskService;
    }

    componentDidMount() {
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
                alt=""
                src={logo}
                className="d-inline-block align-top logo"
              />
            </Navbar.Brand>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                    </ul>
                </div>
            <Navbar.Collapse className="justify-content-end">
                <ConnectButton metamaskService={this.metamaskService} onFail={this.onMetamaskFail.bind(this)}/>
            </Navbar.Collapse>
          </Navbar>
          <ModalFail
            show={this.state.showModal} 
            onHide={this.onHideFailModal.bind(this)} 
            h="Error while connecting to Metamask!"
            b="There seems to be an error with Connecting to your ropsten wallet! Be sure to have selected Ropsten as your network."
          />       
        </>
        )
      else 
        return (
          <>
          <Navbar bg="dark" variant="topbar" fixed="top">
            <Navbar.Brand>
              <img
                alt=""
                src={logo}
                className="d-inline-block align-top logo"
              />
            </Navbar.Brand>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                    </ul>
                </div>
            <Navbar.Collapse className="justify-content-end">
                <EthereumIdenticon address={this.state.account}/>
            </Navbar.Collapse>
          </Navbar>
          <ModalFail
            show={this.state.showModal} 
            onHide={this.onHideFailModal.bind(this)} 
            h="Error while connecting to Metamask!"
            b="There seems to be an error with Connecting to your ropsten wallet! Be sure to have selected Ropsten as your network."
          />
          </>
      )
      }
}