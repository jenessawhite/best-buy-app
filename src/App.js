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
      name: '',
      type: '',
      id: '' ,
      model: '',
      price: 0,
      upc: '',
      image: '',
      description: '',
      }
    }

  componentDidMount () {
    axios.get('http://localhost:3030/products?$sort[price]=-1&$limit=20')
    .then((response) => {
      var newInventory = response.data.data.slice(0);
      this.setState({
        inventory: newInventory
      })
    })
    .catch((error) => {
      alert(error);
      console.log(error);
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    let newProduct = {
      name: this.state.name,
      model: this.state.model,
      description: this.state.description,
      price: this.state.price,
      type: this.state.type,
      image: this.state.image,
      upc: this.state.upc
    };
    axios.post('http://localhost:3030/products', newProduct)
    .then((response) => {
      axios.get('http://localhost:3030/products?$sort[price]=-1&$limit=20').then((response) => {
        let newInventory = response.data.data.slice(0);
        this.setState({
          inventory: newInventory
        })
      })
    }).catch((error) => {
      console.log(error);
      alert(error);
    })
  }

  onChanges(inputChanges, e) {
    var changes = {};
    changes[inputChanges] = e.target.value;
    this.setState(changes);
  }

  onDeleteClick(id, e) {
    var confirmed = confirm("Do you want to permanently delete this product from the database?")
    if (confirmed === true){
      console.log('http://localhost:3030/products/'+id)
      axios.delete('http://localhost:3030/products/'+id)
    } else {
      console.log("Whew!")
    }

  }

  onNewValue(e) {
   this.setState({
     newItemValue: e.target.value
   });
  }

  getSearchedInfo(e){
    e.preventDefault();
    console.log(this.state.newItemValue)
    axios.get('http://localhost:3030/products?name[$like]=*'+this.state.newItemValue+'*&$select[]=name&$select[]=id&$select[]=model&$select[]=description&$select[]=image&$select[]=url&$select[]=price&$select[]=shipping&$sort[price]=-1&$limit=12')
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
        <List
          inventory={this.state.inventory}
          onDeleteClick={this.onDeleteClick.bind(this)} />
        </div>
        <div className="App-form-container">
          <h3 className="form-container_header">Submit your own product</h3>
          <form className="form-container_form" onSubmit={this.onFormSubmit.bind(this)}>
            Product Name:
            <input onChange={this.onChanges.bind(this, 'name')} value={this.state.name} type="text" name="name" required />
            <br />
            Product Model:
            <input onChange={this.onChanges.bind(this, 'model')} value={this.state.model} type="text" name="model" required />
            <br />
            Product Description:
            <input onChange={this.onChanges.bind(this, 'description')} value={this.state.description} type="textarea" name="description" required />
            <br />
            Product Price:
            <input onChange={this.onChanges.bind(this, 'price')} value={this.state.price} type="number" step="0.01" name="price" min="0.01" required />
            <br />
            If you have an image of the product please upload it here:
            <input onChange={this.onChanges.bind(this, 'image')} value={this.state.image} type="text" name="image" />
            <br />
            Please select product type:
            <select onChange={this.onChanges.bind(this, 'type')} value={this.state.type} name="type" required>
              <option value="" disabled="disabled" defaultValue>Choose an Option</option>
              <option value="blackTie">Black Tie</option>
              <option value="bundle">Bundle</option>
              <option value="hardGood">Hard Good</option>
              <option value="movie">Movie</option>
              <option value="music">Music</option>
              <option value="software">Software</option>
            </select>
            <br />
            Product UPC:
            <input onChange={this.onChanges.bind(this, 'upc')} value={this.state.upc} type="text" name="upc" required />
            <br />
            <input type="submit" value="Submit" />
          </form>
          <form onSubmit={this.getSearchedInfo.bind(this)}>
            <input className="searchy" type="text" placeholder="enter product name" onChange={this.onNewValue.bind(this)} value={this.state.newItemValue}/>
            <button>Search</button>
          </form>
      </div>
    </div>
    );
  }
}

export default App;
