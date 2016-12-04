import React, { Component } from 'react';
import './App.css';

class List extends Component {
  constructor() {
    super();
    this.state = {
      listItems: []
    }
  }



  onDeleteClick(index, e) {
    console.log("You clicked delete, my friend!")
    var numID = this.props.getApiInfo
    console.log(numID)

  }

  render() {
    return (
      <div>
        <button onClick={this.props.getApiInfo.bind(this)}>Get Data</button>
        <ul>
          {this.props.inventory.map((item, index) => {
            return (
              <li>
                <div className="liContainerDiv">
                <div className="leftDiv">
                <span>{item.name}</span>
                <br />
                <img role="presentation" className="listImage" src={item.image} />
                <br />
                <span>"Price in USD: "{item.price} plus {item.shipping} shipping</span>
                </div>
                <div className="rightDiv">
                <span>{item.model}</span>
                <br />
                <span>{item.description}</span>
                </div>
                <div className="deleteDiv">
                <button onClick={this.onDeleteClick.bind(this)} key={item.id}>Delete from list</button>
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
