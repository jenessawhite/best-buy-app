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
                    <a href={item.url} target="_blank">
                    <img role="presentation" className="listImage" src={item.image} />
                    </a>
                    <br />
                    <span className="clickMe">Click photo to go to Best Buy site</span>

                  </div>
                  <div className="rightDiv">
                    <div>Price (USD): {item.price}</div>
                    <br />
                    <div>Product Model: {item.model}
                    <br />
                     Product ID: {item.id}</div>
                    <br />
                    <span>Product Description: {item.description}</span>
                  </div>
                  </div>
                  <div className="deleteDiv">
                    <button className="deleteButton" onClick={this.props.onDeleteClick.bind(this, item.id)} key={item.id}>Delete</button>
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
