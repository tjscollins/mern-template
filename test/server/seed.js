'use strict';

const {ObjectID} = require('mongodb');
const UserModel = require('./../../server/models/users.js');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const users = [
  {
    _id: userOneID,
    github: {
      id: '123',
      displayName: 'John Doe',
      username: 'jdoe',
      publicRepos: 1,
    },
  },
  {
    _id: userTwoID,
    githubt: {
      id: '321',
      displayName: 'Jane Doe',
      username: 'janeBetterThanJohn',
      publicRepos: 100,
    },
  },
];

const populateServer = (done) => {
  UserModel.remove({}).then(() => {
    return UserModel.insertMany(users);
  });
  done();
};

module.exports = {
  users, populateServer,
};
