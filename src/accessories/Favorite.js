import React, {Component} from 'react';
import ModalFail from './ModalFail'
import '../css/Favorite.css'

export default class Favorite extends Component {
    state = {
        enabled: false,
        showModal: false
    }
    
    onHideModal() {
        this.setState({
            enabled: this.state.enabled,
            showModal: false
        })
    }

    activeFailModal() {
        this.setState({
            enabled: this.state.enabled,
            showModal: true
        })
    }

    constructor(props) {
        super(props)
        this.id = this.props.id
        this.address = this.props.address
        if (!this.address) return
        if ( localStorage.getItem('favorites-' + this.address) ) {
            const favorites = localStorage.getItem('favorites-' + this.address)
            this.state.enabled = favorites.indexOf(this.id) !== -1
        } else  {
            this.state.enabled = false
            localStorage.setItem('favorites-' + this.address, '[]')
        }
    }

    componentWillReceiveProps(nextProps) {
        this.address = nextProps.address;
        if ( localStorage.getItem('favorites-' + this.address) ) {
            const favorites = localStorage.getItem('favorites-' + this.address)
            this.state.enabled = favorites.indexOf(this.id) !== -1
        } else  {
            this.state.enabled = false
            localStorage.setItem('favorites-' + this.address, '[]')
        }
        this.setState({
            enabled: this.state.enabled,
            showModal: false
        })      
    }

    onClick() {
        if (!this.address) {
            this.activeFailModal();
            return
        }

        const favorites = localStorage.getItem('favorites-' + this.address)
        let object = JSON.parse(favorites)
        if (this.state.enabled) {
            object.splice(object.indexOf(this.id), 1);
        } else {
            object.push(this.id)
        }
        localStorage.setItem('favorites-' + this.address, JSON.stringify(object))

        this.setState({
            enabled: !this.state.enabled,
            showModal: this.state.showModal
        })
    }

    render() {
        return (
            <>
                <div className = {this.state.enabled? 'star-active' : 'star'} onClick = {this.onClick.bind(this)}/>
                <ModalFail
                    show={this.state.showModal} 
                    onHide={this.onHideModal.bind(this)}
                    h="Error adding to favorites!"
                    b="It seems that you are not connected to Metamask. Please do."
                />
            </>   
        );
      }
}