'use strict';
/*eslint-disable require-jsdoc*/
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import {
  createIsomorphicWebpack
} from 'isomorphic-webpack';
import {
  renderToString
} from 'react-dom/server';
import webpackConfiguration from '../../webpack.config.server.js';

const path = process.cwd();

function routes(app, passport) {
  const compiler = webpack(webpackConfiguration);

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

  const {
  createCompilationPromise,
  evalBundleCode
} = createIsomorphicWebpack(webpackConfiguration, {
  useCompilationPromise: true
});

app.use(async (req, res, next) => {
  await createCompilationPromise();
  next();
});


  const sendIndex = (req, res) => {
    const index = (body) => {
      return `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width = device-width, initial-scale = 1.0, minimum-scale = 1, maximum-scale = 1, user-scalable = no" />
          <meta name="mobile-web-app-capable" content="yes">
            <meta name="apple-mobile-web-app-title" content="TrailMaster" />
            <meta name="apple-mobile-web-app-capable" content="yes">
              <title>MERN Template based on Clementine.js</title>

              <link href="/public/css/main.css" rel="stylesheet" type="text/css">
            </head>
            <body>
              <div id='reactApp'>${body}</div>
              <script type="text/javascript" src="/public/bundle.min.js" charset="utf-8"></script>
            </body>
          </html>
          `;
        };
    const requestUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const appBody = renderToString(evalBundleCode(requestUrl).default);
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

  app
    .route('/')
    .get(sendIndex);

  app
    .route('/login')
    .get(sendIndex);

  app
    .route('/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/login');
    });

  app
    .route('/profile')
    .get(isLoggedIn, sendIndex);

  app
    .route('/api/me')
    .get(isLoggedIn,
    /*istanbul ignore next: not sure how to fake req.isAuthenticated() for tests*/
    function(req, res) {
      res.json(req.user);
    });

  app
    .route('/auth/github')
    .get(passport.authenticate('github'));

  app
    .route('/auth/github/callback')
    .get(passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));
};

export default routes;
