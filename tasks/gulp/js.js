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
gulp.task('sitejs', () => {
  return gulp.src([
    path.join(config.shuboxWeb.scripts.src, '_vendor/lazysizes.min.js'),
    path.join(config.shuboxWeb.scripts.src, 'index.js')
  ])
    .pipe(concat('index.js'))
    .pipe(changed(config.shuboxWeb.scripts.dest))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(config.shuboxWeb.scripts.dest))
    .pipe(browserSync.stream({ match: '**/*.js' }))
})

gulp.task('devjs', () => {
  return gulp.src([
    path.join(config.shuboxWeb.scripts.src, '_vendor/shubox.umd.js'),
    path.join(config.shuboxWeb.scripts.src, 'dev.js')
  ])
    .pipe(concat('dev.js'))
    .pipe(changed(config.shuboxWeb.scripts.dest))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(config.shuboxWeb.scripts.dest))
    .pipe(browserSync.stream({ match: '**/*.js' }))
})

gulp.task('highlightjs', () => {
  return gulp.src([
    path.join(config.shuboxWeb.scripts.src, '_vendor/highlight.pack.js'),
    path.join(config.shuboxWeb.scripts.src, 'highlight.js')
  ])
    .pipe(concat('highlight.js'))
    .pipe(changed(config.shuboxWeb.scripts.dest))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(config.shuboxWeb.scripts.dest))
    .pipe(browserSync.stream({ match: '**/*.js' }))
})

gulp.task('stickyjs', () => {
  return gulp.src([
    path.join(config.shuboxWeb.scripts.src, 'stickynav.js')
  ])
    .pipe(concat('stickynav.js'))
    .pipe(changed(config.shuboxWeb.scripts.dest))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(config.shuboxWeb.scripts.dest))
    .pipe(browserSync.stream({ match: '**/*.js' }))
})

gulp.task(
  'js',
  gulp.series([
    'sitejs',
    'devjs',
    'highlightjs',
    'stickyjs'
  ])
)
