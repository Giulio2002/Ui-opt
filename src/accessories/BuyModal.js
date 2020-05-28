import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import '../css/Modal.css'

export default function(onGo, onHide, show, option, expire) {
    return (
      <Modal
        onHide={onHide}
        show={show}
        className="m"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Buy Option
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className="info">Strike: <span>{(option.price_out/option.lock).toFixed(0)} DAI</span></p> 
            <p className="info">Ask: <span>{(option.price_in/option.lock).toFixed(0)} DAI</span></p>
            <p className="info">Total Ask: <span>{option.price_in}</span> DAI</p>
            <p className="info">Total Strike: <span>{option.price_out}</span> DAI</p>
            <p className="info">Amount:  <span>{option.lock}</span> ETH</p>
            <p className="info">Expiration date: <span>{expire}</span></p>
            <p className="info"> Fee: <span>1 DAI</span></p>
          </div>
        </Modal.Body>
        <Modal.Footer>
            Total Buy price = {option.price_in + 1} DAI
          <Button variant="success" onClick={onGo}>
            Buy
          </Button>
          <Button variant="info" onClick={onHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  