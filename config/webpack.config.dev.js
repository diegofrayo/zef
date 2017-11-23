const path = require('path');
const webpack = require('webpack');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({
  size: 2
});

module.exports = {

  webpackConfig: {
    devtool: 'source-map',
    entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../build/assets/'),
      publicPath: '/assets/',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HappyPack({
        id: 'js',
        threadPool: happyThreadPool,
        loaders: ['babel-loader'],
      }),
    ]
  },

  configureBabel: (babelConfig) => {
    babelConfig.use[0].options.plugins.unshift('react-hot-loader/babel');
    babelConfig.use.unshift({
      loader: 'react-hot-loader/webpack'
    });
  },

};
