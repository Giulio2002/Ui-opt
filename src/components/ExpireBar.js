import React, {Component} from 'react';
import {Nav} from "react-bootstrap";
import ExpireBarElement from "../accessories/ExpireBarElement"
import ModalFail from "../accessories/ModalFail"
import '../css/ExpireBar.css';

export default class ExpireBar extends Component {
    state = {
        showFailModal: false
    }
    constructor(props) {
        super(props);
        this.members = [];
        this.metamaskService = this.props.metamaskService
        this.props.elements.forEach(() => this.members.push(React.createRef()))
        this.selected = 0;
    }

    onHideFailModal() {
        this.setState({showFailModal: false})
    }

    onSelect(key) {
        let keyN = parseInt(key);
        if (this.props.elements[key].text === "Sell") {
            this.setState({showFailModal: true})
            // Open Sell Dialog
            return;
        }
        if (this.props.elements[key].text === "My Positions") {
            if (!this.metamaskService.address()) {
                this.setState({showFailModal: true})
                return;
            }
            this.members[this.selected].current.setSelected(false);
            this.members[keyN].current.setSelected(true);
            this.selected = keyN;
            window.EventEmitter.emit('category', 'currpos')
            return
        }

        if (this.props.elements[key].text === "Past Positions") {
            if (!this.metamaskService.address()) {
                this.setState({showFailModal: true})
                return;
            }
            this.members[this.selected].current.setSelected(false);
            this.members[keyN].current.setSelected(true);
            this.selected = keyN;
            window.EventEmitter.emit('category', 'pastpos')
            return
        }

        if (this.props.elements[key].text === "Favorites") {
            if (!this.metamaskService.address()) {
                this.setState({showFailModal: true})
                return;
            }
            this.members[this.selected].current.setSelected(false);
            this.members[keyN].current.setSelected(true);
            this.selected = keyN;
            window.EventEmitter.emit('category', 'fav')
            return
        }


        this.members[this.selected].current.setSelected(false);
        this.members[keyN].current.setSelected(true);
        this.selected = keyN;
        window.EventEmitter.emit('expire', this.props.elements[key])
        window.EventEmitter.emit('category', 'market')
    }

    render() {
        return (
            <>
                <Nav className="d-none d-md-block sidebar bg-dark"
                activeKey="/home"
                onSelect={this.onSelect.bind(this)}
                >
                <Nav.Item>
                    <Nav.Link></Nav.Link>
                </Nav.Item>
                {
                    this.props.elements.map((elem, index) => {
                        return (
                            <Nav.Item>
                                <Nav.Link eventKey={index.toString()}>
                                    <ExpireBarElement text={elem.text} ref={this.members[index]} selected = {this.selected === index}/>
                                </Nav.Link>
                            </Nav.Item>               
                        );
                    })
                }
            </Nav> 
            <ModalFail 
            h="Cannot access to this section" 
            b="In order to access this section, access to Metamask."
            show={this.state.showFailModal} 
            onHide={this.onHideFailModal.bind(this)} 
            ></ModalFail>
        </>
        );
      }
}