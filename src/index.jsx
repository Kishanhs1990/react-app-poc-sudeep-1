import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { Provider } from 'react-redux';

import * as sw from './Services/serviceWorker';
import AppComponent from './Components/App/AppComponent';
import configureStore from './Store/ConfigureStore';
// import configureWebFontService from './Services/WebFontService';

const { store, history } = configureStore();

// eslint-disable-next-line no-console
// console.log(`${process.env.PROJECT_VERSION}:${process.env.REACT_APP_ENV}`);

// if (process.env.REACT_APP_ENV === 'Development') {
// configureWebFontService();
// }

// Handling service worker registration
sw.register();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AppComponent />
    </Router>
  </Provider>,
  document.getElementById('root')
);
