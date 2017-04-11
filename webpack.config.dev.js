const webpack = require('webpack');

/**
 * Webpack Loaders
 */
const preLoaders = [
  {
    test: /\.css$/,
    loader: 'null'
  }, {
    test: /\.mp4$/,
    loader: 'null'
  }, {
    test: /\.svg$/,
    loader: 'null'
  }, {
    test: /\.png$/,
    loader: 'null'
  }, {
    test: /\.jpg$/,
    loader: 'null'
  }, {
    test: /\.gif$/,
    loader: 'null'
  }, {
    test: /\.(otf|eot|ttf|woff|woff2)/,
    loader: 'null'
  },
  // For loading Markdown
  {
    test: /\.(txt|md)$/,
    loader: 'raw-loader'
  },

  // Loader for JSON, used in some tests
  {
    test: /\.json$/,
    loader: 'json'
  }
];

const loaders = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    query: {
      presets: ['react', 'es2015', 'stage-0']
    },
    exclude: /(node_modules|bower_components)/
  }
];

const postLoaders = [
  {
    test: /\.jsx?$/,
    exclude: /(test|node_modules|bower_components)/,
    loader: 'istanbul-instrumenter'
  }
];

const plugins = [new webpack.ProvidePlugin({'$': 'jquery', 'jQuery': 'jquery', 'jquery': 'jquery'})];

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!bootstrap-sass/assets/javascripts/bootstrap.min.js',
    './client/react/react-app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins,
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './client/react/',
      './client/react/components/',
      './client/redux'
    ],
    alias: {
      applicationStyles: 'client/styles/main.scss'
    },
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    preLoaders,
    loaders,
    postLoaders
  },
  devtool: 'eval-source-map'
};
