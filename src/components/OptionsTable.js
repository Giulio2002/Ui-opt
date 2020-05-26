import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import Favorite from "../accessories/Favorite"
import '../css/OptionsTable.css'
import config from '../config'
import {getUsable} from '../http'

export default class OptionsTable extends Component {
    state = {
      ah: [],
      currentExpire: 0,
    }
    constructor(props) {
      super(props)
      this.expiration = this.props.default.text;
      document.body.style.backgroundColor = "#343a40"
      this.state.currentExpire = config.dates[0].stamp
      this.address = this.props.address
    }

    componentDidMount() {
      this.update();
      setTimeout(this.update.bind(this), 30000)
      window.EventEmitter.on('acc', this.onAccountChange.bind(this))
      window.EventEmitter.on('expire', this.onDifferentExpire.bind(this))
    }

    process(rawAh) {
      const timestamp = Math.floor(Date.now() / 1000)
      return rawAh.map(option => {
        option.lock = parseInt(option.lock, 10);
        option.lock = (option.lock / 10**18).toFixed(0) // What lock is
        option.price_in = (parseInt(option.price_in, 10) / 10**18).toFixed(0);
        option.price_out = (parseInt(option.price_out, 10) / 10**18).toFixed(0);

        const until = parseInt(option.until, 10)
        let delta = Math.abs(until - timestamp);
        // days
        const days = Math.floor(delta / 86400);
        delta -= days * 86400;

        // hours
        const hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        const minutes = Math.floor(delta / 60) % 60;
        if (minutes === 0 && hours === 0 && days === 0)
          minutes = 1
        option.until = `${days} days, ${hours} hours, ${minutes} minutes`
        return option
      })
    }

    async update() {
      const ah = await getUsable(this.address, this.state.currentExpire);
      this.setState({
        ah: this.process(ah),
        currentExpire: this.state.currentExpire
      })
    }

    async onAccountChange(acc) {
      const ah = await getUsable(acc[0], this.state.currentExpire);
      this.address = acc[0]
      this.setState({
        ah: this.process(ah),
        currentExpire: this.state.currentExpire
      })
    }

    async onDifferentExpire(expire) {
      const ah = await getUsable(this.address, expire.stamp);
      this.expiration = expire.text;
      this.setState({
        ah: this.process(ah),
        currentExpire: expire.stamp
      })      
    }

    render() {
        return (
        <div>
        <div className = "separator"/>
        <div className="options_table_container">
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Strike</th>
                <th>Ask</th>
                <th>Item</th>
                <th>Total Ask</th>
                <th>Total Strike</th>
                <th>Valid For</th>
                <th>Expiration Date</th>
                </tr>
            </thead>
            <tbody>
            {this.state.ah.map(e => {
              return <tr>
                <td>
                  {(e.price_out/e.lock).toFixed(0)} DAI
                </td>
                <td>{(e.price_in/e.lock).toFixed(0)} DAI</td>
                <td>{e.lock} ETH</td>
                <td>{e.price_in} DAI</td>
                <td>{e.price_out} DAI</td>
                <td>{e.until}</td>
                <td>{this.expiration} <Favorite address={this.address} id={e.id}/> </td>
              </tr>;
            })}
            </tbody>
        </Table>
        </div>
        </div>
        );
      }
}