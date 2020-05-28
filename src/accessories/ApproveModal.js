import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import '../css/Modal.css'

export default function(props) {
    return (
      <Modal
        {...props}
        className="m"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Enabling DAI
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Before continuing, you need to enable DAI on AXIOS.</p> 
            <p>Warning: Enabling Dai is a
            requirement to use this DAPP</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.onApprove}>
            Enable DAI
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  