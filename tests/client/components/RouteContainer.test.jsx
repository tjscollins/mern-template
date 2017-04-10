/*global describe it*/

/*----------Modules----------*/
import expect from 'expect';
import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

/*----------Redux----------*/
// import {Provider} from 'react-redux';
// import {configure} from 'configureStore';

/*----------Components----------*/
import {RouteContainer} from 'RouteContainer';

describe('RouteContainer', () => {
  it('should exist', () => {
    expect(RouteContainer).toExist();
  });

  it('should render without errors', () => {
    try {
      let routeContainer = TestUtils.renderIntoDocument(<RouteContainer />);
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
