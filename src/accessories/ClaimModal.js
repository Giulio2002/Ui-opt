import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import '../css/Modal.css'

function renderButtons(loading, onGo, onHide, tokenBalance, price_out) {
  if (loading) {
    return (
    <>       
      <Button variant="success" disabled>
        Loading...
      </Button>
      <Button variant="info" disabled>
        Cancel
      </Button>
    </>
  )
  } else if(tokenBalance < price_out) {
    return (
    <>       
    <Button variant="success" disabled>
      Not Enough DAI
    </Button>
    <Button variant="info" onClick={onHide}>
      Cancel
    </Button>
  </>)
  } else {
    return (
      <>       
        <Button variant="success" onClick={onGo}>
          Strike
        </Button>
        <Button variant="info" onClick={onHide}>
          Cancel
        </Button>
      </>
    )
  }

}
export default class ClaimModal extends Component {
  state={}
  constructor(props) {
    super(props)
    this.onGo = this.props.onGo
    this.onHide = this.props.onHide
    this.setState({
      show: this.props.show,
      loading: this.props.loading,
      tokenBalance: this.props.tokenBalance,
      option: this.props.option
    })
  }

  componentWillReceiveProps(props) {
    console.log(props)
    this.onGO = props.onGo
    this.onHide = props.onHide
    this.setState({
      show: props.show,
      loading: props.loading,
      tokenBalance: props.tokenBalance,
      option: props.option
    })
  }

  render ()  {
    console.log(this.state)
    if (!this.state.option) {
      return <></>
    }
    return (
      <Modal
        show={this.state.show}
        className="m"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Strike Option
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className="info">Strike: <span>{(this.state.option.price_out/this.state.option.lock).toFixed(0)} DAI</span></p> 
            <p className="info">Total Strike: <span>{this.state.option.price_out}</span> DAI</p>
            <p className="info">Amount:  <span>{this.state.option.lock}</span> ETH</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
            Total Strike price = {this.state.option.price_out} DAI
          {renderButtons(this.state.loading, this.onGo, this.onHide, this.state.tokenBalance, this.state.option.price_out)}
        </Modal.Footer>
      </Modal>
    );
  }
}
  