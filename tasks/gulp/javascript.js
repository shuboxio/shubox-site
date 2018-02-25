const browserSync = require('browser-sync')
const config = require('../../config')
const gulp = require('gulp')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const path = require('path')
const changed = require('gulp-changed')
const concat = require('gulp-concat')

// Concat and minify JS
gulp.task('js', () => {
  return gulp.src([
    path.join(config.shuboxWeb.scripts.src, '_vendor/highlight.pack.js'),
    path.join(config.shuboxWeb.scripts.src, '_vendor/jquery-3.0.0.min.js'),
    path.join(config.shuboxWeb.scripts.src, '_vendor/modernizr-custom.js'),
    path.join(config.shuboxWeb.scripts.src, 'main.js')
  ])
    .pipe(concat('dist.js'))
    .pipe(changed(config.shuboxWeb.scripts.dest))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(config.shuboxWeb.scripts.dest))
    .pipe(browserSync.stream({ match: '**/*.js' }))
})
