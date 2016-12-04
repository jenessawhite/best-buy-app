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

    onDeleteClick(id, e) {
      console.log("You clicked delete, my friend!", id);
      console.log('http://localhost:3030/products/'+id)
      axios.delete('http://localhost:3030/products/'+id)
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
          <h2>"The Best of the Best Buy API"</h2>
        </div>
        <p className="App-intro">
        Welcome, we hope you enjoy your shopping experience.
        </p>
        <div>
        <List
          inventory={this.state.inventory}
          getApiInfo={this.getApiInfo.bind(this)}
          onDeleteClick={this.onDeleteClick.bind(this)
        }/>

        </div>
      </div>
    );
  }
}

export default App;
