/*global describe it beforeEach done*/
const expect = require('expect');
const request = require('supertest');

const passport = require('passport');

require('dotenv').load('../../.env');
require('../../server/config/passport')(passport);

describe('passport configuration', () => {
  it('should register a GITHUB STRATEGY', () => {
    let {github} = passport._strategies;
    expect(github).toExist();
    expect(github.name).toBe('github');
  });
});
