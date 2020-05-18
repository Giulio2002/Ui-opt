import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class ConnectButton extends Component {
    constructor(props) {
        super(props)
        this.metamaskService = this.props.metamaskService
    }

    render() {
        return (
            <Button variant="primary" onClick={this.metamaskService.connect.bind(this.metamaskService)}>Connect To Metamaks</Button>
        );
      }
}