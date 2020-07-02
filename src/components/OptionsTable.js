import React, {Component} from 'react'
import {Table} from 'react-bootstrap'
import {process} from '../process'
import BuyModal from "../accessories/BuyModal"
import Section from "../accessories/Section"
import '../css/OptionsTable.css'
import config from '../config'
import {getUsable} from '../http'

export default class OptionsTable extends Component {
    state = {
      ah: [],
      currentExpire: 0,
      showBuyModal: false,
      isBuying: false
    }
    constructor(props) {
      super(props)
      this.expiration = this.props.default.text;
      this.state.currentExpire = config.dates[0].stamp
      this.address = this.props.address
      this.metamaskService = this.props.metamaskService
    }

    componentDidMount() {
      this.update();
      setTimeout(this.update.bind(this), 30000)
      window.EventEmitter.on('acc', this.onAccountChange.bind(this))
      window.EventEmitter.on('expire', this.onDifferentExpire.bind(this))
      window.EventEmitter.on('update', this.update.bind(this))
    }

    async update() {
      const ah = process(await getUsable(this.state.currentExpire), this.address);
      
      this.setState({
        ah,
        currentExpire: this.state.currentExpire
      })
    }

    async onAccountChange(acc) {
      this.address = acc[0]
      const ah = process(await getUsable(this.state.currentExpire), this.address);
      console.log(await getUsable(this.state.currentExpire))
      this.setState({
        ah,
        currentExpire: this.state.currentExpire
      })
    }

    async onDifferentExpire(expire) {
      const ah = await getUsable(expire.stamp);
      this.expiration = expire.text;
      this.setState({
        ah: process(ah),
        currentExpire: expire.stamp
      }) 
    }

    renderModal() {
      if (this.state.option && this.address) {
        return BuyModal(
          this.onBuy.bind(this),
          this.onHideBuyModal.bind(this),
          this.state.showBuyModal,
          this.state.option,
          this.expiration,
          this.state.isBuying,
          this.tokenBalance
        )
      } else {
        return (<></>)
      }
    }
    render() {
        return (
        <div>
        <div className = "separator"/>
        <div className="options_table_container">
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Strike</th>
                <th>Ask</th>
                <th>Item</th>
                <th>Expiration Date</th>
                </tr>
            </thead>
            <tbody>
            {this.state.ah.map((e,i) => 
            {
              return <Section
                address={this.address}
                options={e}
                strike={config.strikes[i]}
                metamaskService={this.metamaskService}/>
            }
            )}
            </tbody>
        </Table>
        </div>
        {this.renderModal()}
        </div>
        );
      }
}