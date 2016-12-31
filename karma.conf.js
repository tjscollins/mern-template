const webpackConfig = require('./webpack.config.client.js');

module.exports = function(config) {
  config.set({
    autowatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: [
      'mocha',
      'sinon',
    ],
    files: [
      'tests/client/**/*.test.jsx',
    ],
    preprocessors: {
      'tests/client/**/*.test.jsx': ['webpack', 'sourcemap'],
    },
    reporters: ['mocha'],
    client: {
      captureConsole: true,
      mocha: {
        bail: true,
        timeout: '5000',
      },
    },
    browserNoActivityTimeout: 100000,
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
  });
};
