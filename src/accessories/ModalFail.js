import React, {Component} from 'react';
import {Modal, Image, Button} from 'react-bootstrap';
import '../css/ModalFail.css'

export default function(props) {
    return (
      <Modal
        {...props}
        className="m"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
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
  