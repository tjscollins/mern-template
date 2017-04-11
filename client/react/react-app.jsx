/*----------React----------*/
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

/*----------Redux----------*/
import {Provider} from 'react-redux';
import configureStore from 'configureStore';

/*----------Components----------*/
import Index from 'Index';
import Login from 'Login';
import Profile from 'Profile';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router history={browserHistory}>
      <Route path='/' component={Index} />
      <Route path='login' component={Login} />
      <Route path='profile' component={Profile} />
    </Router>
  </Provider>, document.getElementById('react-app'));
