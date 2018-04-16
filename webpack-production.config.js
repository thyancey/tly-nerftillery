var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index.js'
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test: /\.less$/,
      loader: "style!css!less"
    },
    {
      test: /\.(png|jpg)$/,
      loader: "url-loader?limit=8192"
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve('./src')
  },
  output: {
    path: __dirname + '/build',
    publicPath: './',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([{ from: './dist', to: './' }])
  ]
};