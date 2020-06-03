import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import '../css/Modal.css'

function renderButtons(loading, onGo, onHide) {
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
  } else {
    return (
      <>       
        <Button variant="success" onClick={onGo}>
          Retire
        </Button>
        <Button variant="info" onClick={onHide}>
          Cancel
        </Button>
      </>
    )
  }

}
export default class RetireModal extends Component {
  state={}
  constructor(props) {
    super(props)
    this.onGo = this.props.onGo
    this.onHide = this.props.onHide
    this.setState({
      show: this.props.show,
      loading: this.props.loading,
    })
  }

  componentWillReceiveProps(props) {
    console.log(props)
    this.onGO = props.onGo
    this.onHide = props.onHide
    this.setState({
      show: props.show,
      loading: props.loading,
    })
  }

  render ()  {
    return (
      <Modal
        show={this.state.show}
        className="m"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Retire Option
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to retire this option? You will get a refund of the funds
          you provided and the option will be not visible to others.
        </Modal.Body>
        <Modal.Footer>
          {renderButtons(this.state.loading, this.onGo, this.onHide)}
        </Modal.Footer>
      </Modal>
    );
  }
}
  