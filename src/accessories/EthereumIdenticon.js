import React, { Component } from 'react'
import makeBlockie from 'ethereum-blockies-base64';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../css/EthereumIdenticon.css'

class EthereumIdenticon extends Component {

  constructor(props) {
    super(props)
  }

  renderAddress(address) {
    return (props) => 
    (
      <Tooltip id="button-tooltip" {...props}>
        {address}
      </Tooltip>
    );
  }

  render() {
    return (
      <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={this.renderAddress(this.props.address)}>
        <Image src={makeBlockie(this.props.address)} className="identicon"/>
      </OverlayTrigger>
    );
    }
}
       
export default EthereumIdenticon