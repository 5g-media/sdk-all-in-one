import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import validator from './validatorReducer';
import profiling from './profilingReducer';
import leanow from './leanowReducer';
import osm from './osmReducer';
import packaging from './packagingReducer';
import logging from './loggingReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    validator,
    profiling,
    leanow,
    osm,
    packaging,
    logging,
  });
