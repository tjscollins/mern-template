'use strict';
/*eslint-disable require-jsdoc*/

const path = process.cwd();

module.exports = function(app, passport) {
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  app
    .route('/')
    .get(isLoggedIn, function(req, res) {
      res.sendFile(path + '/public/index.html');
    });

  app
    .route('/login')
    .get(function(req, res) {
      res.sendFile(path + '/public/index.html');
    });

  app
    .route('/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/login');
    });

  app
    .route('/profile')
    .get(isLoggedIn, function(req, res) {
      res.sendFile(path + '/public/index.html');
    });

  app
    .route('/api/me')
    .get(isLoggedIn, function(req, res) {
      res.json(req.user.github);
    });

  app
    .route('/auth/github')
    .get(passport.authenticate('github'));

  app
    .route('/auth/github/callback')
    .get(passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login',
    }));
};
