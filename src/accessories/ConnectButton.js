import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class ConnectButton extends Component {
    constructor(props) {
        super(props)
        this.onFail = this.props.onFail
        this.metamaskService = this.props.metamaskService
    }

    onClick() {
        this.metamaskService.connect(this.onFail)
    }
    render() {
        return (
            <Button variant="primary" onClick={this.onClick.bind(this)}>Connect To Metamaks</Button>
        );
      }
}