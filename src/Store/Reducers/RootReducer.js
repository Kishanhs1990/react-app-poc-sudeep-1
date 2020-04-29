/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ContinentsReducer from './ContinentsReducer';
import StringParserReducer from './StringParserReducer';
import history from '../../Router/History';

const appReducer = combineReducers({
  continents: ContinentsReducer,
  parser: StringParserReducer,
  router: connectRouter(history),
});

const RootReducer = (state, action) => {
  if (action.type === 'DESTROY_SESSION') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default RootReducer;
