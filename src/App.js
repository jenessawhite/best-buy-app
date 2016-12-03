import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import List from './List';


class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        inventory: this.props.inventory
      }
    }
  getApiInfo(e) {
    e.preventDefault();
    axios.get('http://localhost:3030/products?$select[]=name&$select[]=id&$select[]=model&$select[]=description&$select[]=image&$select[]=url&$select[]=price&$select[]=shipping&$sort[price]=-1&$limit=12')
  .then((response) => {
    console.log(response.data.data);
    var newInventory = response.data.data.slice(0);
    console.log(newInventory);
    this.setState({
      inventory: newInventory
    })
    console.log(this.state.inventory);
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <List inventory={this.state.inventory} getApiInfo={this.getApiInfo.bind(this)} />
      </div>
    );
  }
}

export default App;
