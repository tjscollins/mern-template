import * as redux from 'redux';
import {userSessionReducer, errorLogReducer} from 'reducers';

const configureStore = (initialState = {}) => {
  let combinedReducer = redux.combineReducers({
    userSession: userSessionReducer,
    errorLog: errorLogReducer,
  });
  let store = redux.createStore(combinedReducer, initialState, redux.compose(window.devToolsExtension
    ? window.devToolsExtension()
    : (f) => f));
  return store;
};

export default configureStore;
