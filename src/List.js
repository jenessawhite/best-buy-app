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

                <span>{item.name}</span>

              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}



export default List;
