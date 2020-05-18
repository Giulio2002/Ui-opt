import React, {Component} from 'react';
import dai from '../assets/dai_icon.png';
import '../css/AssetPrice.css'
export default class AssetPrice extends Component {
    state = {
        price: 0
    }

    constructor(props) {
        super(props);
    }

    updatePrice(price) {
        this.setState({price: price.toFixed(2)})
    }

    render() {
        return (
            <div className="asset_price_container">
                <center>
                    <img src = {this.props.icon}></img>
                    <text className="price">{this.state.price} DAI </text>
                </center>
            </div>
        );
      }
}