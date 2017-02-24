'use strict';

const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/users');
const configAuth = require('./auth');

const registerGithubUser = function(token, refreshToken, profile, done) {
  process
    .nextTick(function() {
      User
        .findOne({
          'github.id': profile.id,
        }, function(err, user) {
					/*istanbul ignore next: not sure how to generate error for test*/
          if (err) {
            return done(err);
          }

					/*istanbul ignore next*/
          if (user) {
            return done(null, user);
          } else {
            let newUser = new User();

            newUser.github.id = profile.id;
            newUser.github.username = profile.username;
            newUser.github.displayName = profile.displayName;
            newUser.github.publicRepos = profile._json.public_repos;

            newUser.save(function(err) {
							/*istanbul ignore next: hard to trigger for tests*/
              if (err) {
                throw err;
              }

              return done(null, newUser);
            });
          }
        });
    });
};
exports.registerGithubUser = registerGithubUser;

/**
 * export - passport initialization
 *
 * @param  {module} passport main passport module
 */
exports.default = function(passport) {
  passport
    .serializeUser(function(user, done) {
      done(null, user.id);
    });

  passport.deserializeUser(function(id, done) {
    User
      .findById(id, function(err, user) {
        done(err, user);
      });
  });

  passport.use(new GitHubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL,
  }, registerGithubUser));
};
