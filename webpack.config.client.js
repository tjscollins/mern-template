const webpack = require('webpack');

module.exports = {
  entry: [
    './client/react/index.jsx',
  ],
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'jquery': 'jquery',
    }),
    // new webpack
    //   .optimize
    //   .OccurenceOrderPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    // new webpack
    //   .optimize
    //   .UglifyJsPlugin({
    //     compressor: {
    //       warnings: false
    //     }
    //   })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './client/components/',
    ],
    alias: {
      applicationStyles: 'client/styles/main.scss',
    },
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    preLoaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  devtool: 'eval-source-map',
};
