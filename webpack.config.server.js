const webpack = require('webpack');
const path = require('path');

export default {
  context: __dirname,
  entry: {
    app: [path.resolve(__dirname, './client/react/react-app.jsx')]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './public')
  },
  resolve: {
    alias: {
      configureStore: path.join(__dirname, 'client/redux/configureStore.js'),
      actions: path.join(__dirname, 'client/redux/actions.js'),
      reducers: path.join(__dirname, 'client/redux/reducers.js'),
      ReactApp: path.join(__dirname, 'client/react/react-app.jsx'),
      Index: path.join(__dirname, 'client/react/components/Index.jsx'),
      Header: path.join(__dirname, 'client/react/components/Header.jsx'),
      Login: path.join(__dirname, 'client/react/components/Login.jsx'),
      Profile: path.join(__dirname, 'client/react/components/Profile.jsx')
    },
    modules: [
      __dirname,
      'node_modules',
      path.join(__dirname, 'client/react'),
      path.join(__dirname, 'client/react/components'),
      path.join(__dirname, 'client/redux')
    ]
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
          }
        }
      }, {
        loaders: [
          {
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
          },
          'resolve-url-loader'
        ],
        test: /\.css$/
      }
    ]
  },
};
