import React, {Component} from 'react';
import '../css/AssetPrice.css'
export default class AssetPrice extends Component {
    state = {
        price: 0
    }

    updatePrice(price) {
        this.setState({price: price.toFixed(2)})
    }

    render() {
        if (this.state.price === 0) {
            return (
                <div className="asset_price_container">
                    <center className="name">Ethereum</center>  
                </div>
            )
        }
        return (
            <div className="asset_price_container">
                    <center className="name">Ethereum</center>
                    <center className="price">{this.state.price} DAI </center>
            </div>
        );
      }
}