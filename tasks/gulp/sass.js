var autoprefixer = require('autoprefixer')
var browserSync = require('browser-sync')
var config = require('../../config')
var gulp = require('gulp')
var notify = require('gulp-notify')
var path = require('path')
var postcss = require('gulp-postcss')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('sass', () => {
  gulp.src(path.join(config.shuboxWeb.styles.src, '*.sass'))
    .pipe(sourcemaps.init())
      .pipe(sass({
        errLogToConsole: false,
        indentedSyntax: true,
        outputStyle: 'compressed'
      }))
        .on('error', function (err) {
          return notify().write(err)
        })
      .pipe(postcss([
        autoprefixer({ browsers: ['last 2 versions'] })
      ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.shuboxWeb.styles.dest))
    .pipe(browserSync.stream({match: '**/*.css'}))
})
