'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  github: {
    id: String,
    displayName: String,
    username: String,
    publicRepos: Number,
  },
});

module.exports = mongoose.model('User', User);
