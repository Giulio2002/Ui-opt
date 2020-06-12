import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap';
import process from '../process'
import ClaimModal from '../accessories/ClaimModal'
import RetireModal from '../accessories/RetireModal'
import '../css/OptionsTable.css'
import '../css/PosTable.css'
import {getPresent, getPast, untilRetire, untilClaim} from '../http'

export default class PosTable extends Component {
    state = {
      ah: [],
    }

    constructor(props) {
      super(props)
      this.present = this.props.present
      this.address = this.props.address
      this.metamaskService = this.props.metamaskService
    }

    async componentDidMount() {
      if (this.present) {
        const raw = await getPresent(this.address)
        this.setState({
          ah: process(raw, this.address),
        })
      } else {
        this.setState({
          ah: process(await getPast(this.address), this.address),
        })      
      }

      window.EventEmitter.on('acc', this.onAccountChange.bind(this))
      window.EventEmitter.on('update', this.update.bind(this))
    }

    async componentWillReceiveProps(props) {
      this.present = props.present
      if (this.present) {
        this.setState({
          ah: process(await getPresent(this.address), this.address),
        })
      } else {
        this.setState({
          ah: process(await getPast(this.address), this.address),
        })      
      }
    }

    async update() {
      if (this.present) {
        this.setState({
          ah: process(await getPresent(this.address), this.address),
        })
      } else {
        this.setState({
          ah: process(await getPast(this.address), this.address),
        })      
      }
    }

    async onAccountChange(acc) {
      this.address = acc[0]
      if (this.present) {
        this.setState({
          ah: process(await getPresent(this.address), this.address),
        })
      } else {
        this.setState({
          ah: process(await getPast(this.address), this.address),
        })      
      }
    }

    async onClaim() {
      try {
        this.setState({
          loading: true,
        })
        const pivot = this.metamaskService.getPivot();
        const tx = await pivot.claim(
            this.state.option.id,
            {
                gasLimit: 200000,
                gasPrice: 50000000000,
            }
        )
        await tx.wait()
        await untilClaim(this.state.option.id)
        
        this.setState({
          ah: process(await getPresent(this.address), this.address),
          loading: false,
          type: 0
        })
      } catch (e) {
        this.setState({
          loading: false
        })
      }
    }

    async onRetire() {
      try {
        this.setState({
          loading: true,
        })
        const pivot = this.metamaskService.getPivot();
        const tx = await pivot.exit(
            this.state.option.id,
            {
                gasLimit: 200000,
                gasPrice: 50000000000,
            }
        )
        await tx.wait()
        await untilRetire(this.state.option.id)
        
        this.setState({
          ah: process(await getPresent(this.address), this.address),
          loading: false,
          type: 0
        })
      } catch (e) {
        this.setState({
          loading: false
        })
      }
    }

    onHideModal() {
      this.setState({
        ah: this.state.ah,
        currentExpire: this.state.currentExpire,
        type: 0
      })
    }

    onRetireClick(option) {
      this.setState({
        option,
        type: 1
      })
    }

    async onClaimClick(option) {
      this.tokenBalance = await this.metamaskService.getTokenBalance()
      this.setState({
        option,
        type: 2
      })
    }

    manipulator(pos)  {
      if (pos.status === "On Sale")
        return (<Button className = "optbutton" variant="outline-danger" onClick={this.onRetireClick.bind(this, pos)}>Retire</Button>)
      else if (pos.status === "Purchased")
        return (<Button className = "optbutton" variant="outline-success" onClick={this.onClaimClick.bind(this, pos)}>Claim</Button>)
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
        <Table striped bordered hover responsive="xl">
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
                <td className={this.positionToColor(e.position)}>{e.position} {this.manipulator(e)}</td>
              </tr>;
            })}
            </tbody>
        </Table>
        </div>
        <ClaimModal
        onGo={this.onClaim.bind(this)}
        onHide={this.onHideModal.bind(this)}
        show={this.state.type === 2}
        loading={this.state.loading}
        tokenBalance={this.tokenBalance}
        option={this.state.option}
        />

        <RetireModal
        onGo={this.onRetire.bind(this)}
        onHide={this.onHideModal.bind(this)}
        show={this.state.type === 1}
        loading={this.state.loading}
        />
        </div>
        );
      }
}