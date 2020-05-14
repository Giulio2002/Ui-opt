import React, {Component} from 'react';
import '../css/StrikeFilter.css'

export default class StrikeFilter extends Component {
    state = {
        
    }
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            
            <select onChange={() => console.log('hi') /*this.props.filterChange*/}>
                <option>No Filter</option>
                <option>300 DAI</option>
                <option>400 DAI</option>
            </select>
        );
      }
}