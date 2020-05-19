import React, {Component} from 'react';
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
                    <img src = {this.props.icon} className="icon"></img>
                    <text className="price">{this.state.price} DAI </text>
            </div>
        );
      }
}