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
            {props.h}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.b}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  