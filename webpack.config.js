process.noDeprecation = true;

const configureEsLint = ({ webpack, path, plugins, config }) => {
  plugins.unshift(
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: path.join(__dirname, './.eslintrc'),
        },
      },
    }),
  );
  config.module.rules.push({
    // exclude: /(assets|build|config|node_modules|test)/,
    include: /(app)/,
    loader: 'eslint-loader',
    test: /(\.js|.jsx)$/,
  });
};

module.exports = (env = {}) => {

  const fs = require('fs');
  const path = require('path');
  const webpack = require('webpack');

  const environment = env.NODE_ENV || process.env.NODE_ENV || 'development';

  let environmentConfig;
  let isDevelopment;
  let settings = {};

  try {
    settings = JSON.parse(fs.readFileSync('./config.app.json', 'utf8'))[environment];
  } catch (error) {
    console.log(error);
    process.exit();
  }

  const BABEL_CONFIG = {
    // exclude: /(assets|build|config|node_modules|test)/,
    test: /(\.js|.jsx)$/,
    include: /(app)/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: ['transform-object-rest-spread', 'transform-class-properties'],
          presets: ['env', 'react'],
          env: {
            production: {
              plugins: ['transform-remove-console'],
            },
          },
        },
      },
    ],
  };

  const CSS_CONFIG = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  };

  const PLUGINS = [
    new webpack.DefinePlugin({
      APP_SETTINGS: JSON.stringify(settings),
    }),
  ];

  const ENTRY_FILES = ['whatwg-fetch', 'babel-polyfill', './app/index.jsx'];

  if (environment === 'development') {
    environmentConfig = require('./config/webpack.config.dev.js');
    environmentConfig.configureHotReloading(BABEL_CONFIG);
  } else {
    environmentConfig = require('./config/webpack.config.prod.js');
  }

  const WEBPACK_CONFIG = Object.assign(
    {},
    {
      context: __dirname,
      resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.resolve(__dirname, 'app'), 'node_modules'],
      },
      module: {
        rules: [BABEL_CONFIG, CSS_CONFIG],
      },
    },
    environmentConfig.webpackConfig,
  );

  WEBPACK_CONFIG.plugins = PLUGINS.concat(WEBPACK_CONFIG.plugins);
  WEBPACK_CONFIG.entry = WEBPACK_CONFIG.entry.concat(ENTRY_FILES);

  if (env.ENABLE_LINT) configureEsLint({ webpack, path, plugins: PLUGINS, config: WEBPACK_CONFIG });

  return WEBPACK_CONFIG;
};
