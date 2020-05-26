import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import Favorite from "../accessories/Favorite"
import '../css/OptionsTable.css'
import TimeTable from '../timeDict'
import {getOption} from '../http'

export default class FavTable extends Component {
    state = {
      ah: []
    }

    constructor(props) {
      super(props)
      this.set(this.props.address)
    }

    async set(address) {
      this.address = address;
      const favs = JSON.parse(localStorage.getItem('favorites-' + this.address))
      console.log('favorites-' + this.address)
      let unprocessed = new Array(favs.length)
      for (let index = 0; index < favs.length; index++) {
        unprocessed[index] = await getOption(favs[index])
      }
      this.setState({
        ah: this.process(unprocessed)
      })
    }

    componentDidMount() {
      window.EventEmitter.on('acc', this.onAccountChange.bind(this))
    }

    statusToColor(status) {
      if (status !== "Avaible")
        return "red"
      return "green"
    }

    process(rawAh) {
      const timestamp = Math.floor(Date.now() / 1000)
      console.log(rawAh)
      return rawAh.map(option => {
        option.lock = parseInt(option.lock, 10);
        option.lock = (option.lock / 10**18).toFixed(0) // What lock is
        option.price_in = (parseInt(option.price_in, 10) / 10**18).toFixed(0);
        option.price_out = (parseInt(option.price_out, 10) / 10**18).toFixed(0);

        const until = parseInt(option.until, 10)
        if (option.status !== "Avaible") {
          option.until = "Terminated"          
          option.expire = "Expired"
          return option;          
        } else {
          option.expire = TimeTable[option.expire]
        }
        if (timestamp > until && option.origin != option.owner) {
          option.until = "Terminated"          
        } else {
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
          option.status = "Avaible"
        }
        return option
      })
    }

    async onAccountChange(acc) {
        this.address = acc[0]
        const favs = JSON.parse(localStorage.getItem('favorites-' + this.address))
        let unprocessed = []
        favs.forEach(async (id) => {
          unprocessed.push(await getOption(id))
        });
        this.setState({
          ah: this.process(unprocessed)
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
                <th>Status</th>
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
                <td>{e.expire} <Favorite address={this.address} id={e.id}/> </td>
                <td className={this.statusToColor(e.status)}>{e.status}</td>
              </tr>;
            })}
            </tbody>
        </Table>
        </div>
        </div>
        );
      }
}