import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';


let inventory = [
  {}
]

ReactDOM.render(
  <App inventory={inventory} />,
  document.getElementById('root')
);
