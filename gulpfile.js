const gulp = require('gulp');
const fs = require('fs');
const g = require('gulp-load-plugins')({ lazy: false });

const htmlminOpts = {
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
    .src(`./build/assets/bundle.js`)
    .pipe(gulp.dest(`${destRootPath}/${assetsPath}/js`));
});


//----------------------------------------------------
//------------------- HTML Tasks ---------------------
gulp.task('build-html', () => {

  const timestamp = +new Date();

  let stream = gulp.src('./app/index.html');
  let jsSources;

  if (environment === 'development') {

    jsSources = [`/${assetsPath}/bundle.js`];

    return stream
      .pipe(g.replace('<!-- INJECT:js -->', createJSTags(jsSources)))
      .pipe(gulp.dest(destRootPath));

  } else {

    jsSources = [`/${assetsPath}/js/bundle.js?${timestamp}`];

    return stream
      .pipe(g.replace('<!-- INJECT:js -->', createJSTags(jsSources)))
      .pipe(g.rename('zef-app.html'))
      .pipe(g.htmlmin(htmlminOpts))
      .pipe(gulp.dest(`${destRootPath}/templates`));

  }
});


//----------------------------------------------------
//------------------- Copy Assets Tasks --------------
gulp.task('copy-assets', () => {
  gulp.src('./assets/images/**/*').pipe(gulp.dest(`${destRootPath}/${assetsPath}/images`));
  gulp.src('./app/vendor/**/*').pipe(gulp.dest(`${destRootPath}/${assetsPath}/js/vendor`));
});


//-------------------------------------------------------
//----------------- Builds Tasks ------------------------
gulp.task('build-dev', () => {
  environment = 'development';
  destRootPath = settings[environment].dest_root_path;
  assetsPath = settings[environment].assets_path;

  g.runSequence('build-html', 'copy-assets');
});

gulp.task('build-live', () => {
  environment = 'production';
  destRootPath = settings[environment].dest_root_path;
  assetsPath = settings[environment].assets_path;

  g.runSequence('build-js', 'build-html', 'copy-assets');
});
