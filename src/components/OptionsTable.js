import React, {Component} from 'react'
import {Table} from 'react-bootstrap'
import process from '../process'
import Favorite from "../accessories/Favorite"
import BuyModal from "../accessories/BuyModal"
import '../css/OptionsTable.css'
import config from '../config'
import {getUsable, untilBuy} from '../http'
import {ethers} from 'ethers'

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
      const ah = process(await getUsable(this.address, this.state.currentExpire), this.address);
      this.setState({
        ah,
        currentExpire: this.state.currentExpire
      })
    }

    async onAccountChange(acc) {
      this.address = acc[0]
      const ah = process(await getUsable(this.address, this.state.currentExpire), this.address);
      console.log(await getUsable(acc[0], this.state.currentExpire))
      this.setState({
        ah,
        currentExpire: this.state.currentExpire
      })
    }

    async onDifferentExpire(expire) {
      const ah = await getUsable(this.address, expire.stamp);
      this.expiration = expire.text;
      this.setState({
        ah: process(ah),
        currentExpire: expire.stamp
      }) 
    }

    onHideBuyModal() {
      this.setState({
        ah: this.state.ah,
        currentExpire: this.state.currentExpire,
        showBuyModal: false
      })
    }

    async onClick(option) {
      if (!this.address) {
        return
      }
      const rawBalance = await this.metamaskService.getTokenBalance();
      this.tokenBalance = parseFloat(ethers.utils.formatEther(rawBalance))   
      this.setState({
        ah: this.state.ah,
        currentExpire: this.state.currentExpire,
        showBuyModal: true,
        option
      })
    }

    async onBuy() {
      try {
        this.setState({
          isBuying: true
        })
        const pivot = this.metamaskService.getPivot();
        const tx = await pivot.buy(
            this.state.option.id,
            {
                gasLimit: 200000,
                gasPrice: 1000000000,
            }
        )
        await tx.wait()
        await untilBuy(this.state.option.id)
        this.update();
        const favs = JSON.parse(localStorage.getItem('favorites-' + this.address))
        localStorage.setItem('favorites-' + this.address, JSON.stringify(
          favs.filter((e) => {
            return e !== this.state.option.id
          })
        ))
        this.setState({
          isBuying: false,
          showBuyModal: false
        })
      } catch (e) {
        console.log(e)
        this.setState({
          isBuying: false
        })
      }
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
                <th>Total Ask</th>
                <th>Total Strike</th>
                <th>Valid For</th>
                <th>Expiration Date</th>
                </tr>
            </thead>
            <tbody>
            {this.state.ah.map(e => {
              return <tr>
                <td onClick={this.onClick.bind(this, e)} className="e">
                  {(e.price_out/e.lock).toFixed(0)} DAI
                </td>
                <td onClick={this.onClick.bind(this, e)} className="e">{(e.price_in/e.lock).toFixed(0)} DAI</td>
                <td onClick={this.onClick.bind(this, e)} className="e">{e.lock} ETH</td>
                <td onClick={this.onClick.bind(this, e)} className="e">{e.price_in} DAI</td>
                <td onClick={this.onClick.bind(this, e)} className="e">{e.price_out} DAI</td>
                <td onClick={this.onClick.bind(this, e)} className="e">{e.until}</td>
                <td>{this.expiration} <Favorite address={this.address} id={e.id}/> </td>
              </tr>;
            })}
            </tbody>
        </Table>
        </div>
        {this.renderModal()}
        </div>
        );
      }
}