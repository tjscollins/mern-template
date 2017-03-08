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
        timeout: '5000'
      }
    },
    coverageReporter: {
      dir: 'test/coverage/',
      reporters: [
        {
          type: 'html',
          subdir: 'html'
        }, {
          type: 'text-summary'
        },
      ]
    },
    files: [
      // 'node_modules/jquery/dist/jquery.min.js',
      'test/client/**/*.test.js',
      'test/client/**/*.test.jsx',
    ],
    frameworks: [
      'mocha', 'sinon',
    ],
    plugins: [
      'karma-phantomjs-launcher', 'karma-mocha', 'karma-sourcemap-loader', 'karma-webpack', 'karma-coverage', 'karma-mocha-reporter', 'karma-sinon',
    ],
    preprocessors: {
      'test/client/**/*.test.js': [
        'webpack', 'sourcemap', //'coverage',
      ],
      'test/client/**/*.test.jsx': [
        'webpack', 'sourcemap', //'coverage',
      ],
    },
    reporters: [
      'mocha', 'coverage',
    ],
    singleRun: true,
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
  });
};
