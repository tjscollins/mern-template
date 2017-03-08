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
import {Index} from 'Index';

describe('Index', () => {
  it('should exist', () => {
    expect(Index).toExist();
  });

  it('should render without errors', () => {
    try {
      let index = TestUtils.renderIntoDocument(<Index />);
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
