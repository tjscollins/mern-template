'use strict';
import 'babel-polyfill';

const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const session = require('express-session');
const bodyParser = require('body-parser');
// const routes = require('./server/routes/index.js');
import routes from './routes/index';

const mongoose = require('mongoose');
const passport = require('passport');


const app = express();
require('dotenv').load();
require('./server/config/passport').default(passport);

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/public', expressStaticGzip(process.cwd() + '/public'));

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
