import React, {Component} from 'react';
import {Modal, Button, InputGroup, FormControl} from 'react-bootstrap';
import {ethers} from 'ethers';
import '../css/Modal.css'
  
export default class BuyModal extends Component {
  
      renderButtons(loading, onGo, onHide, tokenBalance, price_in) {
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
        } else if(tokenBalance < price_in + 1) {
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
                Buy
              </Button>
              <Button variant="info" onClick={onHide}>
                Cancel
              </Button>
            </>
          )
        }
      }

      constructor(props) {
          super(props)
          this.onHide = this.props.onHide
          this.option = this.props.option
          this.show = this.props.show
          this.expire = this.props.expire
          this.loading = this.props.loading
          this.tokenBalance = this.props.tokenBalance
          this.amtRef = React.createRef()
          this.onGo = () => {
            this.props.onGo(ethers.utils.parseEther(this.amtRef.current.value))
          }
      }

      componentWillReceiveProps(props) {
        this.onHide = props.onHide
        this.option = props.option
        this.show = props.show
        this.expire = props.expire
        this.loading = props.loading
        this.tokenBalance = props.tokenBalance
        this.setState({})
      }
  
      render() {
          return (
            <Modal
              show={this.show}
              className="m"
            >
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Buy Option
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <p className="info">Strike: <span>{this.option.ask} DAI</span></p> 
                  <p className="info">Ask: <span>{this.option.strike} DAI</span></p>
                  <p className="info">Amount:  <span>{this.option.lock}</span> ETH</p>
                  <p className="info">Expiration date: <span>{this.expire}</span></p>
                  <p className="info"> Fee: <span>1 DAI</span></p>
                </div>
                <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">Amount</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" ref={this.amtRef}/>
              </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                {this.renderButtons(this.loading, this.onGo, this.onHide, this.tokenBalance, this.option.ask)}
              </Modal.Footer>
            </Modal>
          );
      }
  }
  