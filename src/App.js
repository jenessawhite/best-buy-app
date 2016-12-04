import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import List from './List';


class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        inventory: this.props.inventory,
        newProductName: '',
        newProductModel: '',
        newProductDescription: '',
        newProductPrice: undefined,
        newProductType: '',
        newProductImage: '',
        newProductUpc: ''
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
  .catch((error) => {
    console.log(error);
  });
  }
  onFormSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3030/products', {
      name: this.state.newProductName,
      model: this.state.newProductModel,
      description: this.state.newProductDescription,
      price: this.state.newProductPrice,
      type: this.state.newProductType,
      image: this.state.newProductImage,
      upc: this.state.newProductUpc
    }).then((response) => {
        console.log(response);
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
        .catch((error) => {
          console.log(error);
        });
      }).catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>The Best of the Best Buy API</h2>
        </div>
        <p className="App-intro">
        Welcome, we hope you enjoy your shopping experience.
        </p>
        <div className="App-list-container">
          <List inventory={this.state.inventory} getApiInfo={this.getApiInfo.bind(this)} />
        </div>
        <div className="App-form-container">
          <h3 className="form-container_header">Submit your own product</h3>
          <form className="form-container_form" onSubmit={this.onFormSubmit.bind(this)}>
            Product Name:
            <input value={this.state.newProductName} type="text" name="name" required />
            <br />
            Product Model:
            <input value={this.state.newProductModel} type="text" name="model" required />
            <br />
            Product Description:
            <input value={this.state.newProductDescription} type="textarea" name="description" required />
            <br />
            Product Price:
            <input value={this.state.newProductPrice} type="number" step="0.01" name="price" min="0.01" required />
            <br />
            If you have an image of the product please upload it here:
            <input value={this.state.newProductImage} type="file" name="image" accept="image/*" />
            <br />
            Please select product type:
            <select value={this.state.newProductType} name="type" required>
              <option value="" disabled="disabled" selected="selected">Choose an Option</option>
              <option value="blackTie">Black Tie</option>
              <option value="bundle">Bundle</option>
              <option value="hardgood">Hard Good</option>
              <option value="movie">Movie</option>
              <option value="music">Music</option>
              <option value="software">Software</option>
            </select>
            <br />
            Product UPC:
            <input value={this.state.newProductUpc} type="text" name="upc" required />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
