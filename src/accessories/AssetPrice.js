import React, {Component} from 'react';
import '../css/AssetPrice.css'
export default class AssetPrice extends Component {
    constructor(props) {
        super(props);
        this.price = 235.23
    }

    render() {
        return (
            <div className="asset_price_container">
                <img src = {this.props.icon}></img>
                <text className="name">{this.props.name} </text> <center className="price">{this.price} DAI</center>
            </div>
        );
      }
}