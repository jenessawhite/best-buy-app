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
                    <a href={item.url}>
                    <img role="presentation" className="listImage" src={item.image} />
                    </a>
                    <span className="clickMe">Click photo to go to Best Buy site</span>

                    <br />
                    <span>Price (USD): {item.price} plus {item.shipping} shipping</span>
                  </div>
                  <div className="rightDiv">
                    <span>Product Model:{item.model}</span>
                    <br />
                    <span>Product Description:{item.description}</span>
                  </div>
                  <div className="deleteDiv">
                    <button onClick={this.props.onDeleteClick.bind(this, item.id)} key={item.id}>Delete from list</button>
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
