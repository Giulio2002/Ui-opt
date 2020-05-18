import React, {Component} from 'react';
import '../css/Favorite.css'

export default class Favorite extends Component {
    state = {
        enabled: false
    }
    
    constructor(props) {
        super(props)
        if ( localStorage.getItem('favorites') )
            this.state.enabled = localStorage.getItem('favorites')[this.props.id]
        else 
            this.state.enabled = false
    }

    render() {
        return (
            <div className = {this.state.enabled? 'star' : 'star'}></div>
        );
      }
}