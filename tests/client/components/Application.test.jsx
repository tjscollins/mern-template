/*global describe it*/

/*----------Modules----------*/
import expect from 'expect';
import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

/*----------Redux----------*/
// import {Provider} from 'react-redux'; import {configure} from
// 'configureStore';

/*----------Components----------*/
import {Application} from 'Application';

describe('Application', () => {
  it('should exist', () => {
    expect(Application).toExist();
  });

  it('should render without errors', () => {
    try {
      let app = TestUtils.renderIntoDocument(<Application />);
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
