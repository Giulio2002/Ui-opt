import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import Favorite from "../accessories/Favorite"
import '../css/OptionsTable.css'

export default class OptionsTable extends Component {
    constructor(props) {
      super(props)
      this.ah = new Array(50).fill(null).map(()=> ({'lock':1000, 'ask': 10000, 'strike': 90000, until: "2 days"}))
      this.expiration = this.props.default.text;
      document.body.style.backgroundColor = "#343a40"
    }

    render() {
        return (
        <div>
        <div className = "separator"/>
        <div className="options_table_container">
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Strike</th>
                <th>Ask</th>
                <th>Item</th>
                <th>Total Ask</th>
                <th>Total Strike</th>
                <th>Valid for</th>
                <th>Expiration Date</th>
                </tr>
            </thead>
            <tbody>
            {this.ah.map(e => {
              return <tr>
                <td>
                  {e.strike/e.lock} DAI
                </td>
                <td>{e.ask/e.lock} DAI</td>
                <td>{e.lock} ETH</td>
                <td>{e.ask} DAI</td>
                <td>{e.strike} DAI</td>
                <td>{e.until}</td>
                <td>{this.expiration} <Favorite/> </td>
              </tr>;
            })}
            </tbody>
        </Table>
        </div>
        </div>
        );
      }
}

/*<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>*/