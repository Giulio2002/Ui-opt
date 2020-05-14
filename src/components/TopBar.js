import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import ConnectButton from '../accessories/ConnectButton'
import AssetPrice from '../accessories/AssetPrice'
import logo from '../assets/logo.png';
import eth from '../assets/ethereum_icon.png';
import '../css/TopBar.css'

export default class TopBar extends Component {
    render() {
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
                        <AssetPrice icon = {eth} name="Ethereum"/>
                        </li>
                    </ul>
                </div>
            <Navbar.Collapse className="justify-content-end">
                <ConnectButton/>
            </Navbar.Collapse>
          </Navbar>
        );
      }
}