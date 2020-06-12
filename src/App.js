import React, {Component} from 'react';
import { ethers } from 'ethers';
import Marker from './accessories/Marker'
import TopBar from './components/TopBar';
import ExpireBar from './components/ExpireBar';
import OptionsTable from './components/OptionsTable';
import PosTable from './components/PosTable';
import config from './config'
import MetamaskService from './services/MetamaskService'
import ApproveModal from './accessories/ApproveModal'
import './css/index.css';

export default class App extends Component {
    state = {
        view: 'market',
        showApproveModal: false,
        approveLoading: false
    }

    constructor(props) {
        super(props);
        this.elements = [
            ...config.dates,
            {
              text: 'My Positions'
            },
            {
               text: 'Past Positions'
            },
            {
              text: 'Sell'
            }
          ]
        this.curr = 0
        this.metamaskService = new MetamaskService();
    }

    componentDidMount() {
        window.EventEmitter.on('category', this.onChangeCategory.bind(this))
        window.EventEmitter.on('acc', this.onAccountChange.bind(this))
    }

    onChangeCategory(name) {
        if (name === this.state.view) {
            return
        }

        this.setState({
            view: name,
        })
    }

    async onAccountChange(acc) {
        const token = this.metamaskService.getToken();
        const allowance = await token.allowance(acc[0], this.metamaskService.getPivot().address)
        const zero = ethers.utils.bigNumberify(0)
        if (allowance.eq(zero))
            this.setState({
                view: this.state.view,
                showApproveModal: true,
                approveMessage: false
            })
        else
        this.setState({
            view: this.state.view,
            showApproveModal: false,
            approveMessage: false
        })
            
    }

    async onApproveClick() {
        try {
            const token = this.metamaskService.getToken();
            this.setState({
                view: this.state.view,
                showApproveModal: true,
                approveLoading: true
            })
            const tx = await token.approve(
                this.metamaskService.getPivot().address,
                ethers.utils.bigNumberify("1157920892373161954235709850086879078532699846656405640394575840079131296399"),
                {
                    gasLimit: 100000,
                    gasPrice: 50000000000
                }
            )
            await tx.wait()
            this.setState({
                view: this.state.view,
                showApproveModal: false,
                approveLoading: false
            })
        } catch (e) {
            alert('Transaction denied. Check wheter you have enough funds for gas and try again')
            this.setState({
                view: this.state.view,
                showApproveModal: true,
                approveLoading: false
            })
        }
    }

    table() {
        if (this.state.view === 'market') 
            return (<OptionsTable 
                default={this.elements[this.curr]} 
                address={this.metamaskService.address()}
                metamaskService={this.metamaskService}
                />)
        else if (this.state.view === 'currpos')
            return (<PosTable 
                present = {true} 
                address={this.metamaskService.address()}
                metamaskService={this.metamaskService}
                />)
        else if (this.state.view === 'pastpos')
            return (<PosTable
                present = {false}
                address={this.metamaskService.address()}
                metamaskService={this.metamaskService}
            />)
        else
            return (<></>)

    }
    render() {
        return (
            <>
                <TopBar metamaskService={this.metamaskService}/>
                <ExpireBar elements = {this.elements} metamaskService={this.metamaskService}/>     
                {this.table()}
                <ApproveModal 
                    show={this.state.showApproveModal} 
                    onApprove={this.onApproveClick.bind(this)}
                    loading={this.state.approveLoading}
                />
            </>
        );
      }
}