/*global describe it*/

/*----------Modules----------*/
import expect from 'expect';
import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

/*----------Redux----------*/
import {Provider} from 'react-redux';
import configureStore from 'configureStore';

/*----------Components----------*/
import {Index} from 'Index';

describe('Index', () => {
  it('should exist', () => {
    expect(Index).toExist();
  });

  it('should render without errors', () => {
    try {
      TestUtils.renderIntoDocument(
        <Provider store={configureStore()}>
          <Index />
        </Provider>
      );
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
