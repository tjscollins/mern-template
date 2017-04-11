/*----------React----------*/
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

/*----------Redux----------*/
import {Provider} from 'react-redux';
import configureStore from 'configureStore';

/*----------Components----------*/
import Index from 'Index';
import Login from 'Login';
import Profile from 'Profile';


/**
 * Initial State setup
 */
 const INIT_STATE = {
   userSession: {
   },
 };

ReactDOM.render(
  <Provider store={configureStore(INIT_STATE)}>
    <BrowserRouter >
      <div>
        <Route path='/' component={Index} />
        <Route path='/login' component={Login} />
        <Route path='/profile' component={Profile} />
      </div>
    </BrowserRouter>
  </Provider>, document.getElementById('react-app'));
