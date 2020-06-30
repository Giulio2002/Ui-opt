import React, {Component} from 'react';
import Config from '../config'
import TimeTable from '../timeDict'
import {Modal, Form, Button} from 'react-bootstrap'
import '../css/Modal.css'
import {untilJoin} from '../http'
import { ethers } from 'ethers';

export default class SellModal extends Component {

    state = {
        show: false,
        loading: false,
        invalidAmount: true,
        amountInput: ''
    }

    constructor(props) {
        super(props);
        this.setState({ show: this.props.show })
        this.onHide = () => {
            if (this.state.loading)
                return
            this.props.onHide()
        }
        this.metamaskService = this.props.metamaskService
        this.amountRef = React.createRef()
        this.untilRef = React.createRef()
        this.expireRef = React.createRef()
        this.askRef = React.createRef()
        this.strikeRef = React.createRef()
    }

    componentWillReceiveProps(props) {
        if (props.show !== this.state.show)
            this.setState({ show: props.show })
    }

    async onMax() {
        if (this.state.loading) return
        const bal = await this.metamaskService.getBalance()
        const adjBalance = bal.sub(ethers.utils.bigNumberify("10000000000000000"))
        const fBal = ethers.utils.formatEther(adjBalance)
        this.setState({
            show: true,
            loading: false,
            amountInput: fBal,
            invalidAmount: false
        })
        
    }

    isValidAmount(){
        const val = this.amountRef.current.value
        if (val.indexOf('e') !== -1 || val.indexOf('E') !== -1) {
            this.setState({
                show: true,
                loading: false,
                invalidAmount: true,
                amountInput: val
            })
            return
        }
        if (isNaN(val)) {
            this.setState({
                show: true,
                loading: false,
                invalidAmount: true,
                amountInput: val
            })
        } else {
            if (parseFloat(val) === 0 || isNaN(parseInt(val, 10)) || parseFloat(val) < 0.05) {
                this.setState({
                    show: true,
                    loading: false,
                    invalidAmount: true,
                    amountInput: val
                })
                return
            }
            this.setState({
                show: true,
                loading: false,
                invalidAmount: false,
                amountInput: val
            })
        }
    }

    async onSell() {
        try {
            this.setState({
                show: true,
                loading: true,
                invalidAmount: false,
                amountInput: this.amountRef.current.value
            })
            const timestamp = Math.floor(Date.now() / 1000)
            const amount = ethers.utils.parseEther(this.amountRef.current.value);
            const expire = parseInt(TimeTable[this.expireRef.current.value], 10)
            const strike = parseInt(this.strikeRef.current.value, 10)
            const ask = parseInt(this.askRef.current.value, 10)
            const id = ethers.utils.formatBytes32String(Math.random().toString(20).substr(2, 20))
            console.log(timestamp)
            console.log(expire)
            const pivot = this.metamaskService.getPivot();
            const tx = await pivot.join(
                id,
                expire,
                ethers.utils.bigNumberify(parseInt(ask, 10).toString()),
                ethers.utils.bigNumberify(parseInt(strike, 10).toString()),
                {
                    gasLimit: 200000,
                    gasPrice: 50000000000,
                    value: amount
                }
            )
            await tx.wait()
            await untilJoin(id)
            window.EventEmitter.emit('update', true)
            this.setState({
                loading: false,
                invalidAmount: true,
                amountInput: ''
            })
            this.onHide()
        } catch(e) {
            this.setState({
                show: true,
                loading: false,
                invalidAmount: false,
                amountInput: this.amountRef.current.value
            })

        }
    }

    renderButtons() {
        if (this.state.loading) {
            return (  
            <> 
                <Button variant="danger" onClick={this.onSell.bind(this)} disabled>
                    Loading...
                </Button>
                <Button variant="info" onClick={this.onHide.bind(this)} disabled>
                    Cancel
                </Button>
            </>
            )
        }
        if (this.state.invalidAmount) {
            return(
            <> 
                <Button variant="danger" onClick={this.onSell.bind(this)} disabled>
                    Sell
                </Button>
                <Button variant="info" onClick={this.onHide.bind(this)}>
                    Cancel
                </Button>
            </>
            )
        }
        return(
        <> 
            <Button variant="danger" onClick={this.onSell.bind(this)}>
                Sell
            </Button>
            <Button variant="info" onClick={this.onHide.bind(this)}>
                Cancel
            </Button>
        </>
        )
    }

    render() {
        return (
    <Modal
        show={this.state.show}
        onHide={this.onHide.bind(this)}
        className="m"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Sell
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group>
                <Form.Label>Amount of ETH</Form.Label>
                <Form.Control
                    placeholder="Amount of ETH (E.g 2.3)"
                    ref={this.amountRef}
                    onChange={this.isValidAmount.bind(this)}
                    isInvalid={this.state.invalidAmount}
                    isValid={!this.state.invalidAmount}
                    value={this.state.amountInput}
                    disabled={this.state.loading}
                />
                <Form.Text className="text-muted">
                    <a href onClick={this.onMax.bind(this)}>Max</a>
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Minimun amount is 0.05 ETH!
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Expiration Date</Form.Label>
                <Form.Control 
                as="select" 
                ref={this.expireRef}
                disabled={this.state.loading}
                >
                    <option>{Config.dates[0].text}</option>
                    <option>{Config.dates[1].text}</option>
                    <option>{Config.dates[2].text}</option>
                    <option>{Config.dates[3].text}</option>
                    <option>{Config.dates[4].text}</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Ask Price</Form.Label>
                <Form.Control 
                as="select" 
                ref={this.askRef}
                disabled={this.state.loading}
                >
                    <option value="50">50 DAI</option>
                    <option value="100">100 DAI</option>
                    <option value="150">150 DAI</option>
                    <option value="200">200 DAI</option>
                    <option value="250">250 DAI</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select Strike Price</Form.Label>
                <Form.Control 
                as="select" 
                ref={this.strikeRef}
                disabled={this.state.loading}
                >
                    <option value="300">300 DAI</option>
                    <option value="350">350 DAI</option>
                    <option value="400">400 DAI</option>
                    <option value="450">450 DAI</option>
                    <option value="500">500 DAI</option>
                </Form.Control>
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
            {this.renderButtons()}
        </Modal.Footer>
      </Modal>)
    }
}