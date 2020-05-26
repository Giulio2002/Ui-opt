import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap';
import TimeTable from "../timeDict"
import '../css/OptionsTable.css'
import '../css/PosTable.css'
import {getPresent, getPast} from '../http'

export default class PosTable extends Component {
    state = {
      ah: [],
    }

    constructor(props) {
      super(props)
      this.present = this.props.present
      console.log(this.present)
      this.address = this.props.address
    }

    async componentDidMount() {
      let rawAh
      if (this.present) {
        rawAh = await getPresent(this.address)
      } else {
        rawAh = await getPast(this.address)
      }
      this.setState({
        ah: this.process(rawAh),
      })
      window.EventEmitter.on('acc', this.onAccountChange.bind(this))
    }

    async componentWillReceiveProps(props) {
      this.present = props.present
      let rawAh
      if (this.present) {
        rawAh = await getPresent(this.address)
      } else {
        rawAh = await getPast(this.address)
      }
      this.setState({
        ah: this.process(rawAh),
      })
    }

    process(rawAh) {
      console.log(rawAh)
      const timestamp = Math.floor(Date.now() / 1000)
      console.log(rawAh)
      return rawAh.map(option => {
        option.lock = parseInt(option.lock, 10);
        option.lock = (option.lock / 10**18).toFixed(0) // What lock is
        option.price_in = (parseInt(option.price_in, 10) / 10**18).toFixed(0);
        option.price_out = (parseInt(option.price_out, 10) / 10**18).toFixed(0);

        const until = parseInt(option.until, 10)
        const s = option.status

        if (option.origin === this.address) {
          option.position = "Sell"
        } else {
          option.position = "Buy"
        }

        if (option.status === "Avaible")  {
            option.status = "On Sale"
        } else if (option.status === "Expired") {
          option.status = "Expired and Returned"
        } else if (option.status === "Purchased" && option.position === "Sell") {
          option.status = "Sold and Pending"
        }

        option.expire = TimeTable[option.expire]
        if (s !== "Avaible" && s !== "Purchased") {
          option.until = "Terminated"
          return option
        }

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

    async onAccountChange(acc) {
      this.address = acc[0]
      let rawAh
      if (this.present) {
        rawAh = await getPresent(this.address)
      } else {
        rawAh = await getPast(this.address)
      }      
      this.setState({
        ah: this.process(rawAh),
      })
    }

    onClaim() {

    }

    onRetire() {

    }

    manipulator(status)  {
      if (status === "On Sale")
        return (<Button className = "optbutton" variant="outline-danger" onClick={this.onRetire.bind(this)}>Retire</Button>)
      else if (status === "Purchased")
        return (<Button className = "optbutton" variant="outline-success" onClick={this.onClaim.bind(this)}>Claim</Button>)
    }

    positionToColor(pos) {
      if (pos === "Sell")
        return "red"
      return "green"
    }

    render() {
        return (
        <div>
        <div className = "separator"/>
        <div className="options_table_container">
        <Table striped bordered hover variant="dark" responsive="xl">
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
                <th>Position </th>
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
                <td>{e.expire}</td>
                <td>{e.status}</td>
                <td className={this.positionToColor(e.position)}>{e.position} {this.manipulator(e.status)}</td>
              </tr>;
            })}
            </tbody>
        </Table>
        </div>
        </div>
        );
      }
}