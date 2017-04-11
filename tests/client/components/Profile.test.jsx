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
import {Profile} from 'Profile';

describe('Profile', () => {
  it('should exist', () => {
    expect(Profile).toExist();
  });

  it('should render without errors', () => {
    try {
      TestUtils.renderIntoDocument(<Profile />);
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
