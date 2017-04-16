'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('babel-polyfill');
var webpack = _interopDefault(require('webpack'));
var webpackDevMiddleware = _interopDefault(require('webpack-dev-middleware'));
var isomorphicWebpack = require('isomorphic-webpack');
var reactDom_server = require('react-dom/server');

var webpack$1 = require('webpack');
var path$1 = require('path');

var webpackConfiguration = {
  context: __dirname,
  entry: {
    app: [path$1.resolve(__dirname, './client/react/react-app.jsx')]
  },
  plugins: [new webpack$1.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })],
  output: {
    filename: '[name].js',
    path: path$1.resolve(__dirname, './public')
  },
  resolve: {
    alias: {
      configureStore: path$1.join(__dirname, 'client/redux/configureStore.js'),
      actions: path$1.join(__dirname, 'client/redux/actions.js'),
      reducers: path$1.join(__dirname, 'client/redux/reducers.js'),
      ReactApp: path$1.join(__dirname, 'client/react/react-app.jsx'),
      Index: path$1.join(__dirname, 'client/react/components/Index.jsx'),
      Header: path$1.join(__dirname, 'client/react/components/Header.jsx'),
      Login: path$1.join(__dirname, 'client/react/components/Login.jsx'),
      Profile: path$1.join(__dirname, 'client/react/components/Profile.jsx')
    },
    modules: [__dirname, 'node_modules', path$1.join(__dirname, 'client/react'), path$1.join(__dirname, 'client/react/components'), path$1.join(__dirname, 'client/redux')]
  },
  module: {
    rules: [
    // For loading Markdown
    {
      test: /\.(txt|md)$/,
      loader: 'raw-loader'
    },
    // Loader for JSON, used in some tests
    {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.jsx?$/,
      use: {
        loader: 'babel-loader',
        query: {
          'babelrc': false,
          'presets': [['es2015', {
            'modules': false
          }], ['react'], ['stage-0']],
          'plugins': []
        }
      }
    }, {
      loaders: [{
        loader: 'style-loader',
        query: {
          sourceMap: 1
        }
      }, {
        loader: 'css-loader',
        query: {
          importLoaders: 1,
          localIdentName: '[path]___[name]___[local]',
          modules: 1
        }
      }, 'resolve-url-loader'],
      test: /\.css$/
    }]
  }
};

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/*eslint-disable require-jsdoc*/

var path = process.cwd();

function routes(app, passport) {
  var _this = this;

  var compiler = webpack(webpackConfiguration);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: '/public',
    quiet: false,
    stats: {
      assets: false,
      chunkModules: false,
      chunks: false,
      colors: true,
      hash: false,
      timings: false,
      version: false
    }
  }));

  var _createIsomorphicWebp = isomorphicWebpack.createIsomorphicWebpack(webpackConfiguration, {
    useCompilationPromise: true
  }),
      createCompilationPromise = _createIsomorphicWebp.createCompilationPromise,
      evalBundleCode = _createIsomorphicWebp.evalBundleCode;

  app.use(function () {
    var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return createCompilationPromise();

            case 2:
              next();

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());

  var sendIndex = function sendIndex(req, res) {
    var index = function index(body) {
      return '\n      <!doctype html>\n      <html>\n        <head>\n          <meta charset="utf-8" />\n          <meta name="viewport" content="width = device-width, initial-scale = 1.0, minimum-scale = 1, maximum-scale = 1, user-scalable = no" />\n          <meta name="mobile-web-app-capable" content="yes">\n            <meta name="apple-mobile-web-app-title" content="TrailMaster" />\n            <meta name="apple-mobile-web-app-capable" content="yes">\n              <title>MERN Template based on Clementine.js</title>\n\n              <link href="/public/css/main.css" rel="stylesheet" type="text/css">\n            </head>\n            <body>\n              <div id=\'reactApp\'>' + body + '</div>\n              <script type="text/javascript" src="/public/bundle.min.js" charset="utf-8"></script>\n            </body>\n          </html>\n          ';
    };
    var requestUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var appBody = reactDom_server.renderToString(evalBundleCode(requestUrl).default);
    res.send(index(appBody));
  };

  function isLoggedIn(req, res, next) {
    /*istanbul ignore next: not sure how to fake req.isAuthenticated() for tests*/
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  app.route('/').get(sendIndex);

  app.route('/login').get(sendIndex);

  app.route('/logout').get(function (req, res) {
    req.logout();
    res.redirect('/login');
  });

  app.route('/profile').get(isLoggedIn, sendIndex);

  app.route('/api/me').get(isLoggedIn,
  /*istanbul ignore next: not sure how to fake req.isAuthenticated() for tests*/
  function (req, res) {
    res.json(req.user);
  });

  app.route('/auth/github').get(passport.authenticate('github'));

  app.route('/auth/github/callback').get(passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
}

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var options = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  }
};
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-template', options);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

var express = require('express');
var compression = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');

var app = express();
require('dotenv').load();
require('./server/config/passport').default(passport);

app.use(bodyParser.json());
app.use(compression());
app.use(session({
  secret: 'secretClementine',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
routes(app, passport);
app.use('/public', express.static(process.cwd() + '/public'));
mongoose.connection.once('open', function () {
  // Wait for the database connection to establish, then start the app.
  var port = process.env.PORT || /* istanbul ignore next: no need to test */8080;
  app.listen(port, function () {
    console.log('Node.js listening on port ' + port + '...');
  });
});

module.exports = {
  app: app
};
