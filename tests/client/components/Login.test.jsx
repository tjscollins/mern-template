/*global describe it*/

/*----------Modules----------*/
import expect from 'expect';
import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

/*----------Redux----------*/
// import {Provider} from 'react-redux';
// import {configure} from 'configureStore';

/*----------Components----------*/
import {Login} from 'Login';

describe('Login', () => {
  it('should exist', () => {
    expect(Login).toExist();
  });

  it('should render without errors', () => {
    try {
      TestUtils.renderIntoDocument(<Login />);
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
