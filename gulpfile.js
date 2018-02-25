const gulp = require('gulp');
const fs = require('fs');
const g = require('gulp-load-plugins')({ lazy: false });

const HTML_MIN_OPTS = {
  removeComments: true,
  collapseWhitespace: true,
  removeEmptyAttributes: false,
  collapseBooleanAttributes: true,
  removeRedundantAttributes: true,
};

let destRootPath;
let assetsPath;
let environment;
let settings;

try {
  settings = JSON.parse(fs.readFileSync('./config.app.json', 'utf8'));
} catch (error) {
  g.util.log('MY LOG ==> ' + error);
  process.exit();
}


//----------------------------------------------------
//------------------- Util Functions -----------------
const createCSSTags = (cssSources) => {
  const createTag = url => `<link href="${url}" rel="stylesheet"/>\n\t`;
  return cssSources.map(url => createTag(url)).join('');
};

const createJSTags = (jsSources) => {
  const createTag = url => `<script src="${url}"></script>\n\t`;
  return jsSources.map(url => createTag(url)).join('');
};


//----------------------------------------------------
//------------------- JS Tasks -----------------------
gulp.task('build-js', () => {
  return gulp
    .src(`./build/assets/zef/js/bundle.js`)
    .pipe(gulp.dest(`${destRootPath}/${assetsPath}/js`));
});


//----------------------------------------------------
//------------------- HTML Tasks ---------------------
gulp.task('build-html', () => {

  const timestamp = +new Date();

  let jsSources;
  let stream = gulp
    .src('./app/index.html')
    .pipe(g.replace('<!-- APP_TITLE -->', settings.APP_TITLE))
    .pipe(g.replace('<!-- ASSETS_PATH -->', assetsPath));

  if (environment === 'development') {

    jsSources = [`/${assetsPath}/js/bundle.js`];

    return stream
      .pipe(g.replace('<!-- INJECT:js -->', createJSTags(jsSources)))
      .pipe(gulp.dest(destRootPath));

  } else {

    jsSources = [`/${assetsPath}/js/bundle.js?${timestamp}`];

    return stream
      .pipe(g.replace('<!-- INJECT:js -->', createJSTags(jsSources)))
      .pipe(g.rename('zef.html'))
      .pipe(g.htmlmin(HTML_MIN_OPTS))
      .pipe(gulp.dest(`${destRootPath}/templates`));

  }
});


//----------------------------------------------------
//------------------- Copy Assets Tasks --------------
gulp.task('copy-assets', () => {
  gulp.src('./assets/images/**/*').pipe(gulp.dest(`${destRootPath}/${assetsPath}/images`));
  gulp.src('./assets/js/vendor/**/*').pipe(gulp.dest(`${destRootPath}/${assetsPath}/js/vendor`));
});


//-------------------------------------------------------
//----------------- Builds Tasks ------------------------
gulp.task('build-dev', () => {
  environment = 'development';
  settings = settings[environment];
  destRootPath = settings.dest_root_path;
  assetsPath = settings.assets_path;

  g.runSequence('build-html', 'copy-assets');
});

gulp.task('build-live', () => {
  environment = 'production';
  settings = settings[environment];
  destRootPath = settings.dest_root_path;
  assetsPath = settings.assets_path;

  g.runSequence('build-js', 'build-html', 'copy-assets');
});
