import React, { Component } from 'react';
import './App.css';

class List extends Component {
  constructor() {
    super();
    this.state = {
      listItems: []
    }
  }
  render() {
    return (
      <div>
        <ul>
          {this.props.inventory.map((item, index) => {
            return (
              <li key={item.id}>
                <div className="liContainerDiv">
                <div className="leftDiv">
                  <span>{item.name}</span>
                  <br />
                  <span>Product ID: {item.id}</span>
                  <br />
                  <img role="presentation" className="listImage" src={item.image} />
                  <br />
                  <span>Price (USD): {item.price}</span>
                </div>
                <div className="rightDiv">
                  <span>Product Model:{item.model}</span>
                  <br />
                  <span>Product Description:{item.description}</span>
                </div>
                <div className="deleteDiv">
                  <button>Delete from list</button>
                </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}



export default List;
