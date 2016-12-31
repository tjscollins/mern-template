/*global describe it beforeEach done*/
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../../server.js');

describe('Server Routes', () => {
  describe('/', () => {
    describe('GET', () => {
      it('should respond', (done) => {
        request(app)
          .get('/')
          .send()
          .expect(302)
          .end((err, res) => {
            if (err)
              return done(err);
            done();
          });
      });
    });
  });
});
