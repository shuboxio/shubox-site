const gulp = require('gulp')
const config = require('../../config')
const browserSync = require('browser-sync')
const cp = require('child_process')
const path = require('path')
const changed = require('gulp-changed')

// ============================================================
// Build Jekyll, Build!
// ============================================================
gulp.task('jekyll-build', (done) => {
  return cp.spawn(
    'jekyll',
    [
      'build',
      '--source',
      config.shuboxWeb.jekyll.src,
      '--destination',
      'tmp'
    ],
    { stdio: 'inherit' }
  ).on('close', done)
})

// ============================================================
// Sync Jekyll, Sync!
// ============================================================
gulp.task('jekyll-sync', () => {
  return gulp.src(path.join(config.shuboxWeb.jekyll.tmp, '**'))
    .pipe(changed(config.shuboxWeb.jekyll.dest))
    .pipe(gulp.dest(config.shuboxWeb.jekyll.dest))
    .pipe(browserSync.stream({ match: '**/*.html' }))
})
