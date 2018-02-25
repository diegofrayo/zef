const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  webpackConfig: {
    entry: [],
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, '../build/assets/zef/js'),
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      new CleanWebpackPlugin(['build'], {
        root: path.join(__dirname, '../'),
        verbose: true,
        dry: false,
      }),
    ],
  },
};
