import expect from 'expect';
import df from 'deep-freeze-strict';

import configureStore from 'configureStore';
import * as actions from 'actions';
import * as reducers from 'reducers';

describe('redux tests', () => {
  describe('configureStore', () => {
    it('should configure the Redux store to an initial state', () => {
      const initialState = {
        userSession: {},
        errorLog: [],
      };
      let {userSession, errorLog} = configureStore(df(initialState)).getState();
      expect(userSession).toEqual({});
      expect(errorLog).toEqual([]);
    });
  });

  describe('action generators', () => {
    describe('userSession actions', () => {
      it('should generate the SET_USER action', () => {
        const action = {
          type: 'SET_USER',
          user: 'user',
        };
        expect(actions.setUser('user')).toEqual(df(action));
      });
    });

    describe('errorLog actions', () => {
      it('should generate the ERROR_LOG action', () => {
        const action = {
          type: 'ERROR_LOG',
          error: 'error',
        };
        expect(actions.errorLog('error')).toEqual(df(action));
      });
    });
  });

  describe('reducers', () => {
    describe('userSession reducer', () => {
      it('should SET USER session data in the redux store', () => {
        const action = {
          type: 'SET_USER',
          user: {_id: 'user'}
        };
        const initState = {};
        const finalState = {
          _id: 'user',
        };
        expect(reducers.userSessionReducer(df(initState), df(action))).toEqual(df(finalState));
      });
    });

    describe('errorLog reducer', () => {
      it('should store errors in the redux store', () => {
        const error = new Error('Error');
        const action = {
          type: 'ERROR_LOG',
          error,
        };
        const initState = [];
        const finalState = [error];
        expect(reducers.errorLogReducer(df(initState), df(action))).toEqual(df(finalState));
      });
    });
  });
});
