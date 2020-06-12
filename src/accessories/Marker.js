import React, {Component} from 'react';
import '../css/Marker.css'

export default class Marker extends Component {
    state = {
        enabled: true,
    }

    constructor(props) {
        super(props)
        this.id = this.props.id
        this.address = this.props.address
    }

    componentWillReceiveProps(nextProps) {
        this.address = nextProps.address;    
    }


    render() {
        if (!this.state.enabled) return (<></>);
        return (
            <>
                <div className = "star-active"/>
            </>   
        );
      }
}