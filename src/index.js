import React from 'react';
import ReactDOM from 'react-dom';
import TopBar from './components/TopBar';
import ExpireBar from './components/ExpireBar';
import OptionsTable from './components/OptionsTable';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css'
const elements = [
  {
    text: "10/11/2020"
  },
  {
    text: "11/11/2020"
  },
  {
    text: "12/11/2020"
  },
  {
    text: "01/12/2020"
  },
  {
    text: "02/12/2020"
  },
  {
    text: "My Positions"
  },
  {
    text: "Favorites"
  }
]

ReactDOM.render(
  <React.StrictMode>
    <TopBar/>
    <ExpireBar elements = {elements}/>     
    <OptionsTable default={elements[0]}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
