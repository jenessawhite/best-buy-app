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
        <button onClick={this.props.getApiInfo.bind(this)}>Get Data</button>
        <ul>
          {this.props.inventory.map((item, index) => {
            return (
              <li key={index}>
                <div className="liContainerDiv">
                <div className="leftDiv">
                <span>{item.name}</span>
                <br />
                <img className="listImage" src={item.image} />
                <br />
                <span>{item.price}</span>
                </div>
                <div className="rightDiv">
                <span>{item.model}</span>
                <br />
                <span>{item.description}</span>
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
