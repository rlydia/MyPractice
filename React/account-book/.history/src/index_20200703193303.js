import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import axios from 'axios';s
import App from './App';
import * as serviceWorker from './serviceWorker';

/*
  axios.get('http://localhost:3004/items').then((response) => {
    console.log(response)
  })
  const newItem = {
    "title": "更新后的请别人喝茶",
    "price": 500,
    "date": "2020-06-19",
    "monthCategory": "2020-06",
    "id": "_qryggm534",
    "cid": "3",
    "timestamp": 1584588047772  // new Date().getTime()
  }
  axios.post('http://localhost:3004/items', newItem).then((response) => {
    console.log(response)
  })
 */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
