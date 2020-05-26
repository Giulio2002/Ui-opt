import React, {Component} from 'react';
import TopBar from './components/TopBar';
import ExpireBar from './components/ExpireBar';
import OptionsTable from './components/OptionsTable';
import FavTable from './components/FavTable';
import PosTable from './components/PosTable';
import config from './config'
import MetamaskService from './services/MetamaskService'
import ApproveModal from './accessories/ApproveModal'
import './css/index.css';

export default class App extends Component {
    state = {
        view: 'market',
        showApproveModal: false
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
              text: 'Favorites'
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

    onAccountChange(acc) {
        this.setState({
            view: this.state.view,
            showApproveModal: true
        })
    }

    onApproveClick() {
        this.setState({
            view: this.state.view,
            showApproveModal: false
        })
    }

    table() {
        if (this.state.view === 'market') 
            return (<OptionsTable default={this.elements[this.curr]} address={this.metamaskService.address()}/>)
        else if (this.state.view === 'fav')
            return (<FavTable address={this.metamaskService.address()}/>)
        else if (this.state.view === 'currpos')
            return (<PosTable present = {true} address={this.metamaskService.address()}/>)
        else if (this.state.view === 'pastpos')
            return (<PosTable present = {false} address={this.metamaskService.address()}/>)
        else
            return (<></>)

    }
    render() {
        return (
            <>
                <TopBar metamaskService={this.metamaskService}/>
                <ExpireBar elements = {this.elements} metamaskService={this.metamaskService}/>     
                {this.table()}
                <ApproveModal show={this.state.showApproveModal} onApprove={this.onApproveClick.bind(this)}/>
            </>
        );
      }
}