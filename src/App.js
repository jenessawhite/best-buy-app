import React, { Component } from 'react';
import logo from './laptoplogo.svg';
import axios from 'axios';
import List from './List';
import './normalize.css';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: this.props.inventory,
      name: '',
      type: '',
      id: '' ,
      model: '',
      price: '',
      upc: '',
      image: '',
      description: '',
      isFormShown: false,
      lastSearched: 'http://localhost:3030/products?$sort[price]=-1&$limit=20'
      }
    }

  componentDidMount () {
    axios.get(this.state.lastSearched)
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
      price: parseFloat(this.state.price, 10),
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
      .then((response) => {
        axios.get(this.state.lastSearched).then((response) => {
          let newInventory = response.data.data.slice(0);
          this.setState({
            inventory: newInventory
          })
        })
      }).catch((error) => {
        console.log(error);
        alert(error);
      })

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
    axios.get('http://localhost:3030/products?name[$like]=*'+this.state.newItemValue+'*&$select[]=name&$select[]=id&$select[]=model&$select[]=description&$select[]=image&$select[]=url&$select[]=price&$select[]=shipping&$sort[price]=-1&$limit=20')
    .then((response) => {
      console.log(response.data.data);
      var newInventory = response.data.data.slice(0);
      console.log(newInventory);
      this.setState({
        inventory: newInventory,
        lastSearched: 'http://localhost:3030/products?name[$like]=*'+this.state.newItemValue+'*&$select[]=name&$select[]=id&$select[]=model&$select[]=description&$select[]=image&$select[]=url&$select[]=price&$select[]=shipping&$sort[price]=-1&$limit=20'
      })
      console.log(this.state.inventory);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  onToggleForm(e) {
    e.preventDefault();
    this.setState({
      isFormShown: !this.state.isFormShown
    })
  }

  render() {
    let addProductForm =
      <div className="App-form-container">
        <h3>Add Product Form</h3>
        <form className="form-container_form" onSubmit={this.onFormSubmit.bind(this)}>
          <input onChange={this.onChanges.bind(this, 'name')} value={this.state.name} type="text" name="name" className="formInputs" placeholder="Product Name" required />
          <br />

          <input onChange={this.onChanges.bind(this, 'model')} value={this.state.model} type="text" name="model" className="formInputs" placeholder="Product Model" required />
          <br />

          <input onChange={this.onChanges.bind(this, 'description')} value={this.state.description} type="textarea" name="description" className="formInputs" placeholder="Product Description" required />
          <br />

          <input onChange={this.onChanges.bind(this, 'price')} value={this.state.price} type="number" step="0.01" name="price" min="0.01" className="formInputs" placeholder="Product Price" required />
          <br />

          <input onChange={this.onChanges.bind(this, 'image')} value={this.state.image} type="text" name="image" className="formInputs" placeholder="Product Image URL" />
          <br />

          <select onChange={this.onChanges.bind(this, 'type')} value={this.state.type} name="type" className="formInputs" required>
          <option value="" disabled="disabled" defaultValue>Choose an Option</option>
          <option value="blackTie">Black Tie</option>
          <option value="bundle">Bundle</option>
          <option value="hardGood">Hard Good</option>
          <option value="movie">Movie</option>
          <option value="music">Music</option>
          <option value="software">Software</option>
          </select>
          <br />

          <input onChange={this.onChanges.bind(this, 'upc')} value={this.state.upc} type="text" name="upc" className="formInputs" placeholder="Product UPC" required />
          <br />

          <input type="submit" value="Submit" className="formInputs button" />
        </form>
      </div>

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>The Best of the Best Buy API</h2>
        </div>
        <div className="App-search-container">
          <form onSubmit={this.getSearchedInfo.bind(this)} className="App-search-form">
            <input  className="searchInput searchy" type="text" placeholder="enter product name" onChange={this.onNewValue.bind(this)} value={this.state.newItemValue}/>
            <button className="button">Search</button>
          </form>
        </div>
        <button className="form-container_button button center" onClick={this.onToggleForm.bind(this)} >Add a Product</button>
          {!this.state.isFormShown ? null : addProductForm}
        <div className="App-list-container">
          <List
            inventory={this.state.inventory}
            onDeleteClick={this.onDeleteClick.bind(this)} />
        </div>
        <div className="App-footer">
          <a href="https://developer.bestbuy.com" className="App-footer-BBLogo" target="_blank">
            <img src="https://developer.bestbuy.com/images/bestbuy-logo.png" alt="Best Buy Developer" />
          </a>
          <p className="App-footer-text">This is an educational product that utilizes the Best Buy API Playground.
          </p>
        </div>
    </div>
    );
  }
}

export default App;
