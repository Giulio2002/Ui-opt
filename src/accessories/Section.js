import React, {Component} from 'react';
import Marker from './Marker'
import ListingModal from './ListingModal'

export default class Section extends Component {
    state = {
        options: 0,
        skin: 0,
        address:0
    }

    constructor(props) {
        super(props)
        this.metamaskService = this.props.metamaskService
        this.strike = this.props.strike
        this.state.options = this.props.options
        this.state.skin = this.props.options[0]
        this.state.address = this.props.address
        this.state.show = false
    }

    componentWillReceiveProps(props) {
        this.setState({
            options: props.options,
            skin: props.options[0],
            address: props.address,
        })   
    }

    marker() {
        if (this.state.options.length !== 0 && this.state.skin.origin === this.state.address) 
            return <Marker/>
    }

    switchListingModal() {this.setState({show: !this.state.show})}

    render() {
        let e = this.state.skin
        if (!e) {
            return (
            <>
              <tr>
                <td className="e">{this.strike} DAI</td>
                <td className="e">-----</td>
                <td className="e">-----</td>
                <td className="e">-----</td>
                <ListingModal 
                    options={this.state.options}
                    onHide={this.switchListingModal.bind(this)}
                    show={this.state.show}
                />
              </tr>
            </>   
        );
        } else {
            return (
                <>
                  <tr>
                    <td onClick={this.switchListingModal.bind(this)} className="e">{this.strike} DAI</td>
                    <td onClick={this.switchListingModal.bind(this)} className="e">{e.ask} DAI</td>
                    <td onClick={this.switchListingModal.bind(this)} className="e">{e.lock} ETH</td>
                    <td onClick={this.switchListingModal.bind(this)}>{e.expire} {this.marker()}</td>
                    <ListingModal 
                        options={this.state.options}
                        onHide={this.switchListingModal.bind(this)}
                        show={this.state.show}
                        address={this.state.address}
                        metamaskService={this.metamaskService}/>
                  </tr>
                </>   
            );
        }
      }
}