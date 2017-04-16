const webpack = require('webpack');
const path = require('path');

const postLoaders = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'istanbul-instrumenter'
  }
];

module.exports = {
  entry: [
    'script-loader!jquery/dist/jquery.min.js', 'script-loader!bootstrap-sass/assets/javascripts/bootstrap.min.js', './client/react/react-app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    alias: {
      Index: path.join(__dirname, 'client/react/components/Index.jsx'),
      Header: path.join(__dirname, 'client/react/components/Header.jsx'),
      Login: path.join(__dirname, 'client/react/components/Login.jsx'),
      Profile: path.join(__dirname, 'client/react/components/Profile.jsx')
    },
    modules: [
      __dirname, 'node_modules', path.join(__dirname, 'client/react'),
      path.join(__dirname, 'client/react/components'),
      path.join(__dirname, 'client/redux')
    ]
  },
  module: {
    rules: [
      { // For loading Markdown
        test: /\.(txt|md)$/,
        loader: 'raw-loader'
      },
      // Loader for JSON, used in some tests
      {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              'babelrc': false,
              'presets': [
                [
                  'es2015', {
                    'modules': false
                  }
                ],
                ['react'],
                ['stage-0']
              ],
              'plugins': [],
              'env': {
                'test': {
                  'plugins': ['istanbul']
                }
              }
            }
          }
        ]
      }
    ]
  },
  devtool: 'eval-source-map'
};
