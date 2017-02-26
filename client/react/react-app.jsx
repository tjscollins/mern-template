/*----------React----------*/
import React from 'react';
import ReactDOM from 'react-dom';

/*----------Redux----------*/
import {Provider} from 'react-redux';
import configureStore from 'configureStore';

/*----------Components----------*/
import Application from 'Application';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Application />
  </Provider>, document.getElementById('react-app'));
