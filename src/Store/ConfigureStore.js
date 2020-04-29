import axios from 'axios';
import promise from 'redux-promise-middleware';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';

import clientMiddleware from './Middlewares/ClientMiddleware';
import apolloClient from './Middlewares/ApolloMiddleware';
import history from '../Router/History';
import RootReducer from './Reducers/RootReducer';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
});

const configureStore = (options = { logger: true }) => {
  const enhancers = [];

  if (process.env.REACT_APP_ENV === 'Development') {
    const { devToolsExtension } = window;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const middleware = [
    ReduxThunk,
    routerMiddleware(history),
    promise,
    clientMiddleware(httpClient, apolloClient),
  ];
  if (options.logger && process.env.REACT_APP_ENV !== 'Production') {
    const logger = createLogger({ collapsed: true });
    middleware.push(logger);
  }
  const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

  // Create the store
  const store = createStore(RootReducer, composedEnhancers);

  return {
    store,
    history,
  };
};

export default configureStore;
