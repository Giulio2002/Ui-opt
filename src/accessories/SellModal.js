import React, {Component} from 'react';
import Config from '../config'
import {Modal, Form, Button} from 'react-bootstrap'
import '../css/Modal.css'

export default class SellModal extends Component {

    state = {
        show: false
    }

    constructor(props) {
        super(props);
        this.setState({ show: this.props.show })
        this.onHide = this.props.onHide
    }

    componentWillReceiveProps(props) {
        this.setState({ show: props.show })
    }

    onSell() {
    }

    render() {
        return (
    <Modal
        show={this.state.show}
        onHide={this.onHide.bind(this)}
        className="m"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sell
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Amount of ETH</Form.Label>
                <Form.Control type="email" placeholder="Amount of ETH (E.g 2.3)" />
                <Form.Text className="text-muted">
                    <a>Max</a>
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Expiration Date</Form.Label>
                <Form.Control as="select">
                    <option>{Config.dates[0].text}</option>
                    <option>{Config.dates[1].text}</option>
                    <option>{Config.dates[2].text}</option>
                    <option>{Config.dates[3].text}</option>
                    <option>{Config.dates[4].text}</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Selfdestruct Timeout</Form.Label>
                <Form.Control as="select">
                    <option>12 Hours</option>
                    <option>1 Day</option>
                    <option>2 Days</option>
                    <option>3 Days</option>
                    <option>4 Days</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Ask Price</Form.Label>
                <Form.Control as="select">
                    <option>50 DAI</option>
                    <option>100 DAI</option>
                    <option>150 DAI</option>
                    <option>200 DAI</option>
                    <option>250 DAI</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Strike Price</Form.Label>
                <Form.Control as="select">
                    <option>300 DAI</option>
                    <option>350 DAI</option>
                    <option>400 DAI</option>
                    <option>450 DAI</option>
                    <option>500 DAI</option>
                </Form.Control>
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.onSell.bind(this)}>
            Sell
          </Button>
          <Button variant="info" onClick={this.onHide.bind(this)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>)
    }
}