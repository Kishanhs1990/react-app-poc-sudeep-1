import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './Components/App/AppComponent';
import * as serviceWorker from './Services/ServiceWorker/serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AppComponent />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
