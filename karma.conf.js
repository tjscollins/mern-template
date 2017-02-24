const webpackConfig = require('./webpack.config.dev.js');

module.exports = function(config) {
  config.set({
    autowatch: false,
    browsers: [
      'PhantomJS',
    ],
    browserNoActivityTimeout: 100000,
    client: {
      captureConsole: true,
      mocha: {
        bail: true,
        timeout: '5000',
      },
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
    },
    files: [
      // 'node_modules/jquery/dist/jquery.min.js',
      'tests/client/**/*.test.js',
      'tests/client/**/*.test.jsx',
    ],
    preprocessors: {
      'tests/client/**/*.test.js': [
        'webpack', 'sourcemap', 'coverage',
      ],
      'tests/client/**/*.test.jsx': [
        'webpack', 'sourcemap', 'coverage',
      ],
    },
    reporters: [
      'mocha', 'coverage',
    ],
    singleRun: true,
    frameworks: [
      'mocha', 'sinon',
    ],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
  });
};
