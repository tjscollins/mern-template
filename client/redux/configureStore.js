import * as redux from 'redux';
import {reducer} from 'reducers';

const configureStore = (initialState = {}) => {
  let combinedReducer = reducer || redux.combineReducers({
    main: reducer,
  });
  let store = redux.createStore(combinedReducer, initialState, redux.compose(window.devToolsExtension
    ? window.devToolsExtension()
    : (f) => f));
  return store;
};

export default configureStore;
