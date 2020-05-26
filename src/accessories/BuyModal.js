import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import '../css/ModalFail.css'

export default function(onGo, onHide, show, option) {
    return (
      <Modal
        onHide={onHide}
        show={show}
        className="m"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Buy Option
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Strike: {(option.price_out/option.lock).toFixed(0)} DAI</p> 
            <p>Ask: {(option.price_in/option.lock).toFixed(0)} DAI</p>
            <p>Total Ask: {option.price_in} DAI</p>
            <p>Total Strike: {option.price_out} DAI</p>
            <p>Amount: {option.lock} ETH</p>
            <p>Expiration date: {option.expire}</p>
            <p> Fee: 1 DAI </p>
        </Modal.Body>
        <Modal.Footer>
            Total Buy price = {option.price_in + 1} DAI
          <Button variant="success" onClick={onGo}>
            Buy
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  