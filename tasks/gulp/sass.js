var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync');
var config = require('../../config');
var gulp = require('gulp');
var notify = require('gulp-notify');
var path = require('path');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var stripCssComments = require('gulp-strip-css-comments');

gulp.task('sass', () => {
  return gulp
    .src(path.join(config.shuboxWeb.styles.src, '*.sass'))
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errLogToConsole: true,
        indentedSyntax: true,
        outputStyle: 'compressed',
      }),
    )
    .on('error', function(err) {
      return notify().write(err);
    })
    .pipe(postcss([
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"]
      })
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(stripCssComments({preserve: false}))
    .pipe(gulp.dest(config.shuboxWeb.styles.dest))
    .pipe(browserSync.stream({match: '**/*.css'}));
});
