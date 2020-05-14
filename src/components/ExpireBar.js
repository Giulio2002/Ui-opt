import React, {Component} from 'react';
import {Nav} from "react-bootstrap";
import ExpireBarElement from "../accessories/ExpireBarElement"
import '../css/ExpireBar.css';

export default class ExpireBar extends Component {
    constructor(props) {
        super(props);
        this.members = [];
        this.props.elements.forEach(() => this.members.push(React.createRef()));
        this.selected = 0;
    }

    onSelect(key) {
        let keyN = parseInt(key);
        this.members[this.selected].current.setSelected(false);
        this.members[keyN].current.setSelected(true);
        this.selected = keyN;
    }

    render() {
        return (
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
                                <ExpireBarElement text={elem.text} ref={this.members[index]} selected = {this.selected == index}/>
                            </Nav.Link>
                        </Nav.Item>               
                    );
                })
            }
        </Nav> 
        );
      }
}