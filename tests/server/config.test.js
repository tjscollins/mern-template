/*global describe it beforeEach done*/
const expect = require('expect');
const request = require('supertest');
const sinon = require('sinon');
const passport = require('passport');
const User = require('./../../server/models/users.js');
const {users, populateServer} = require('./seed');

require('dotenv').load('../../.env');
// require('../../server/config/passport').default(passport);

beforeEach((done) => {
  populateServer(done);
});

describe('Passport Configuration', () => {
  it('should register a GITHUB STRATEGY', () => {
    let {github} = passport._strategies;
    expect(github).toExist();
    expect(github.name).toBe('github');
  });

  it('should register serializeUser', () => {
    let [serializeUser] = passport._serializers;
    expect(serializeUser).toExist();
    let spy = sinon.spy();
    serializeUser({id: '1'}, spy);
    expect(spy.calledOnce).toBe(true);
  });

  it('should register deserializeUser', (done) => {
    let [deserializeUser] = passport._deserializers;
    expect(deserializeUser).toExist();
    deserializeUser(users[0]._id, (err, user) => {
      done();
    });
  });

  it('should register new users in the database', (done) => {
    const {registerGithubUser} = require('../../server/config/passport');
    let profile = {
      id: '234',
      username: 'awesome1',
      displayName: 'Slartibartfast',
      _json: {
        public_repos: 1024,
      },
    };
    registerGithubUser(null, null, profile, (err, user)=> {
      User.findOne({'github.id': '234'}, (err, user) => {
        if(err) {
          done(err);
        }
        expect(user).toExist();
        expect(user.github.username).toBe('awesome1');
        expect(user.github.displayName).toBe('Slartibartfast');
        done();
      });
    });
  });

  it('should return existing users in the database rather than overwriting them', (done) => {
    const {registerGithubUser} = require('../../server/config/passport');
    let profile = {
      id: '123',
      username: 'awesome1',
      displayName: 'Slartibartfast',
      _json: {
        public_repos: 1024,
      },
    };
    registerGithubUser(null, null, profile, (err, user) =>{
      User.findOne({'github.id': '123'}, (err, user) => {
        if(err) {
          done(err);
        }
        expect(err).toBe(null);
        expect(user).toExist();
        expect(user.github.username).toBe(users[0].github.username);
        expect(user.github.displayName).toBe(users[0].github.displayName);
        done();
      });
    });
  });
});
