'use strict';

const express = require('express');
const routes = require('./server/routes/index.js');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
require('dotenv').load();
require('./server/config/passport').default(passport);

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/controllers', express.static(process.cwd() + '/server/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/server/common'));

app.use(session({
  secret: 'secretClementine',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

const port = process.env.PORT || /* istanbul ignore next: no need to test */ 8080;
app.listen(port, function() {
  console.log('Node.js listening on port ' + port + '...');
});

module.exports = {
  app,
};
