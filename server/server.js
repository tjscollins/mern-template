'use strict';
import 'babel-polyfill';
import routes from './routes/index';
import mongoose from './config/mongoose';

const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');


const app = express();
require('dotenv').load();
require('./server/config/passport').default(passport);

app.use(bodyParser.json());
app.use(compression());
app.use(session({
  secret: 'secretClementine',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
routes(app, passport);
app.use('/public', express.static(process.cwd() + '/public'));
mongoose.connection.once('open', function() {
  // Wait for the database connection to establish, then start the app.
  const port = process.env.PORT || /* istanbul ignore next: no need to test */ 8080;
  app.listen(port, function() {
    console.log('Node.js listening on port ' + port + '...');
  });
});

module.exports = {
  app,
};
