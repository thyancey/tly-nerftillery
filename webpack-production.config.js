var webpack = require('webpack');

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
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: './',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  // plugins: [
  //   new webpack.optimize.DedupePlugin(),
  //   new webpack.optimize.UglifyJsPlugin({
  //     minimize: true,
  //     compress: {
  //       warnings: false
  //     }
  //   })
  // ],
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ]
};