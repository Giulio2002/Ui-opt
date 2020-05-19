import React, {Component} from 'react';
import '../css/ExpireBarElement.css'

export default class ExpireBarElement extends Component {
    state = {
        className: "element block"
    }
    
    constructor(props) {
        super(props);
        if (this.props.selected) {
            this.state.className = "selected block"
        }
    }

    setSelected(select) {
        if (select) {
            this.setState(
                {className: "selected block"}
            );
        } else {
            this.setState(
                {className: "element block"}
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