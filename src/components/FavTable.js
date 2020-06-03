import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import Favorite from "../accessories/Favorite"
import BuyModal from "../accessories/BuyModal"
import '../css/OptionsTable.css'
import process from '../process'
import {getOption, untilBuy} from '../http'
import {ethers} from 'ethers'

export default class FavTable extends Component {
    state = {
      ah: [],
      showBuyModal: false
    }

    constructor(props) {
      super(props)
      this.metamaskService = this.props.metamaskService
      this.set(this.props.address)
    }

    async set(address) {
      this.address = address;
      const favs = JSON.parse(localStorage.getItem('favorites-' + this.address))
      if (!favs) {
        localStorage.setItem('favorites-' + this.address, '[]')
        this.setState({
          ah: []
        })
        return
      }
      console.log('favorites-' + this.address)
      let unprocessed = new Array(favs.length)
      for (let index = 0; index < favs.length; index++) {
        unprocessed[index] = await getOption(favs[index])
      }
      this.setState({
        ah: process(unprocessed, this.address)
      })
    }

    componentDidMount() {
      window.EventEmitter.on('acc', this.onAccountChange.bind(this))
    }

    statusToColor(status) {
      if (status !== "On Sale")
        return "red"
      return "green"
    }

    async onAccountChange(acc) {
        this.address = acc[0]
        const favs = JSON.parse(localStorage.getItem('favorites-' + this.address))
        let unprocessed = []
        favs.forEach(async (id) => {
          unprocessed.push(await getOption(id))
        });
        this.setState({
          ah: process(unprocessed, this.address)
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
        const favs = JSON.parse(localStorage.getItem('favorites-' + this.address))
        localStorage.setItem('favorites-' + this.address, JSON.stringify(
          favs.filter((e) => {
            return e !== this.state.option.id
          })
        ))
        this.set(this.address);
        this.setState({
          isBuying: false,
          showBuyModal: false
        })
      } catch (e) {
        this.setState({
          isBuying: false
        })
      }
    }

    renderModal() {
      if (this.state.option && this.state.option.status === 'On Sale') {
        return BuyModal(
          this.onBuy.bind(this),
          this.onHideBuyModal.bind(this),
          this.state.showBuyModal,
          this.state.option,
          this.state.option.expire,
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
                <th>Status</th>
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
                <td onClick={this.onClick.bind(this, e)} className="e">{e.expire}</td>
                <td className={this.statusToColor(e.status)}>
                  {e.status}
                  <Favorite address={this.address} id={e.id}/>
                </td>
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