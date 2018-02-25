const path = require('path');
const webpack = require('webpack');

module.exports = {
  webpackConfig: {
    devtool: 'source-map',
    entry: ['react-hot-loader/patch', 'webpack-hot-middleware/client'],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../build/assets/zef/js'),
      publicPath: '/assets/zef/js/',
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  },
  configureHotReloading: babelConfig => {
    babelConfig.use[0].options.plugins.unshift('react-hot-loader/babel');
    babelConfig.use.unshift({ loader: 'react-hot-loader/webpack' });
  },
};
