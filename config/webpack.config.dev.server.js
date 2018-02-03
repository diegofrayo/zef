/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const Browsersync = require('browser-sync');
const cmd = require('node-cmd');
const task = require('./task');
const webpack = require('webpack');

// Build the app and launch it in a browser for testing via Browsersync
module.exports = task('webpack.config.dev.server', () => new Promise((resolve) => {

	let count = 0;
	const bs = Browsersync.create();
	const webpackConfig = require('./../webpack.config')({
    ENABLE_LINT: true,
    NODE_ENV: process.env.NODE_ENV,
  });
	const compiler = webpack(webpackConfig);
	const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
		publicPath: webpackConfig.output.publicPath
	});

	compiler.plugin('done', (stats) => {
		// Launch Browsersync after the initial bundling is complete
		count += 1;
		if (count === 1) {
			bs.watch('app/index.html').on('change', () => {
				cmd.get('gulp build-dev', (data) => {
					bs.reload();
				});
			});
			bs.init({
				port: process.env.PORT || 4567,
				ui: {
					port: Number(process.env.PORT || 4567) + 1
				},
				server: {
					baseDir: 'build',
					middleware: [
						webpackDevMiddleware,
						require('webpack-hot-middleware')(compiler),
						require('connect-history-api-fallback')(),
					]
				},
			}, resolve);
		}
	});
}));
