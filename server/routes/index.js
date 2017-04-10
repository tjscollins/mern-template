'use strict';
/*eslint-disable require-jsdoc*/
const path = process.cwd();

const sendIndex = (req, res) => {
  res.sendFile(`${path}/public/index.html`);
};

module.exports = function(app, passport) {
  function isLoggedIn(req, res, next) {
    /*istanbul ignore next: not sure how to fake req.isAuthenticated() for tests*/
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }
  // app.get('*.js', function(req, res, next) {
  //   console.log('JS requested', req.url);
  //   req.url = req.url + '.gz';
  //   res.set('Content-Encoding', 'gzip');
  //   next();
  // });

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
      res.json(req.user.github);
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
