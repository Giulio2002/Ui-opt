import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import '../css/Modal.css'

export default function(onGo, onHide, show, option) {
    return (
      <Modal
        onHide={onHide}
        show={show}
        className="m"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Retire Option
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Strike: {(option.price_out/option.lock).toFixed(0)} DAI</p> 
            <p>Ask: {(option.price_in/option.lock).toFixed(0)} DAI</p>
            <p>Total Ask: {option.price_in} DAI</p>
            <p>Total Strike: {option.price_out} DAI</p>
            <p>Amount: {option.lock} ETH</p>
            <p>Expiration date: {option.expire}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={onGo}>
            Retire
          </Button>
          <Button variant="info" onClick={onHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  