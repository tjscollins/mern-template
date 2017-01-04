import * as redux from 'redux';
import thunk from 'redux-thunk';
import {reducer} from 'reducers';

const configure = (initialState = {}) => {
  let combinedReducer = reducer || redux.combineReducers({
    main: reducer,
  });
  let store = redux.createStore(combinedReducer, initialState, redux.compose(redux.applyMiddleware(thunk), window.devToolsExtension
    ? window.devToolsExtension()
    : (f) => f));
  return store;
};

export default configure;
