import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routeReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import auth from './auth';
import counter from './counter';
import { reducer as form } from 'redux-form';
import info from './info';
import widgets from './widgets';
import { selectedMethod, photosFromMethod } from './photos';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  photosFromMethod,
  selectedMethod,
  auth,
  form
});
