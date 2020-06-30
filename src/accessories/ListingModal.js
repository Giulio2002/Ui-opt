import React, { Component } from 'react';
import {Modal, Button, Table} from 'react-bootstrap';
import Marker from '../accessories/Marker'
import BuyModal from "../accessories/BuyModal"
import {genericSleep} from '../http'
import {ethers} from 'ethers'
import '../css/Modal.css'


export default class ListingModal extends Component {
  state={}

  constructor(props) {
    super(props)
    this.onHide = this.props.onHide
    this.metamaskService = this.props.metamaskService
    this.address = this.props.address
    this.setState({
      show: this.props.show,
      options: this.props.options,
    })
  }

  componentWillReceiveProps(props) {
    this.metamaskService = this.props.metamaskService
    this.address = this.props.address    
    this.setState({
      options: props.options,
      show: props.show
    })
  }

  async onBuy(amt) {
    try {
      this.setState({
        isBuying: true
      })
      const pivot = this.metamaskService.getPivot();
      const tx = await pivot.buy(
          this.state.option.id,
          amt,
          {
              gasLimit: 200000,
              gasPrice: 50000000000,
          }
      )
      await tx.wait()
      await genericSleep();
      window.EventEmitter.emit('update', true)
      this.setState({
        isBuying: false,
        showBuyModal: false
      })
    } catch (e) {
      console.log(e)
      this.setState({
        isBuying: false
      })
    }
  }

  onHideBuyModal() {
    this.setState({
      ah: this.state.ah,
      currentExpire: this.state.currentExpire,
      showBuyModal: false
    })
  }

  async onClick(option) {
    
    if (!this.address || this.address === option.origin) {
      return
    }
    this.onHide()
    const rawBalance = await this.metamaskService.getTokenBalance();
    this.tokenBalance = parseFloat(ethers.utils.formatEther(rawBalance))   
    this.setState({
      ah: this.state.ah,
      currentExpire: this.state.currentExpire,
      showBuyModal: true,
      option
    })
  }

  marker(option) {
    if (this.state.options.length !== 0 && option.origin === this.address) 
        return <Marker/>
    }

  renderModal() {
    if (this.state.option && this.address && this.address !== this.state.option.origin ) {
      return (<BuyModal
        onGo = {this.onBuy.bind(this)}
        onHide = {this.onHideBuyModal.bind(this)}
        show = {this.state.showBuyModal}
        option =  {this.state.option}
        expire = {this.expiration}        
        loading = {this.state.isBuying}
        tokenBalance = {this.tokenBalance}
      />)  
    } else {
      return (<></>)
    }
  }


  render ()  {
    if (!this.state.options) return (<></>)
    return (
      <>
      <Modal
        show={this.state.show}
        size="lg"
        dialogClassName="listing-dialog"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Ask</th>
                <th>Strike</th>
                <th>Item</th>
                <th>Expiration Date</th>
                </tr>
            </thead>
            <tbody>
            {this.state.options.map(e => {
              return <tr style={{cursor: "pointer"}}>
                <td onClick={this.onClick.bind(this,e)}>{e.ask} DAI</td>
                <td onClick={this.onClick.bind(this,e)}>{e.strike} DAI</td>
                <td onClick={this.onClick.bind(this,e)}>{e.lock} ETH</td>
                <td onClick={this.onClick.bind(this,e)}>{e.expire} {this.marker(e)}</td>
              </tr>;
            })}
            </tbody>
        </Table>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="info" onClick={this.onHide.bind(this)}>
            Cancel
            </Button>
        </Modal.Footer>
      </Modal>
      {this.renderModal()}
      </>
    );
  }
}