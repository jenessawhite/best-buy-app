import React, { Component } from 'react';
import {View, Image } from 'react';
import './App.css';

class DisplayImage extends Component {
  constructor() {
    super();
    this.state = {
      listItems: []
    }
    
  render() {
    return (
      <div>
      <ul>
        {this.props.inventory.map((item, index) => {
          return (
            <li key={index}>
            <View>
             <Image source={item.image}/>
            </View>
            </li>
          )
        })}
      </ul>
      </div>
    )
  }
}

export default DisplayImage;
