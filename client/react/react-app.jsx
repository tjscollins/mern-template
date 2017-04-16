/*----------React----------*/
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, MemoryRouter, Route} from 'react-router-dom';
import uuid from 'uuid';

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
  userSession: {}
};

const routes = [
  <Route key={uuid()} path='/' component={Index} />,
  <Route key={uuid()} path='/login' component={Login} />,
  <Route key={uuid()} path='/profile' component={Profile} />
];

const router = (type) => {
  switch(type) {
    case 'client':
      return <BrowserRouter>
        <div>
          {routes}
        </div>
      </BrowserRouter>;
    case 'server':
      return <MemoryRouter>
        <div>
          {routes}
        </div>
      </MemoryRouter>;
    default:
      throw new Error('Invalid type: ' + type + '\nShould be client or server');
  }
};


const reactApp = <Provider store={configureStore(INIT_STATE)}>
  {ISOMORPHIC_WEBPACK === 'undefined'
    ? router('client')
    : router('server')}
</Provider>;

if (typeof ISOMORPHIC_WEBPACK === 'undefined') {
  ReactDOM.render(reactApp, document.getElementById('reactApp'));
}

export default reactApp;
