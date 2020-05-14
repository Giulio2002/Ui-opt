import React, {Component} from 'react';
import '../css/ExpireBarElement.css'

export default class ExpireBarElement extends Component {
    state = {
        className: "element"
    }
    
    constructor(props) {
        super(props);
        if (this.props.selected) {
            this.state.className = "selected"
        }
    }

    setSelected(select) {
        if (select) {
            this.setState(
                {className: "selected"}
            );
        } else {
            this.setState(
                {className: "element"}
            );
        }
    }

    render() {
        return (
            <div className={this.state.className}>
                <text className="content">{this.props.text} </text>
            </div>
        );
      }
}