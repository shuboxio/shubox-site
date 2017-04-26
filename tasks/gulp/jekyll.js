const gulp = require('gulp')
const config = require('../../config')
const browserSync = require('browser-sync')
const cp = require('child_process')
const path = require('path')
const changed = require('gulp-changed')

// ============================================================
// Build Jekyll, Build!
// ============================================================

var buildCommand = [
  'exec',
  'jekyll',
  'build',
  '--source',
  config.shuboxWeb.jekyll.src,
  '--destination',
  'tmp'
]

if (process.env.PRODUCTION_BUILD === 'true') {
  buildCommand.push(
    '--config',
    'src/jekyll/_config.yml,src/jekyll/_production_config.yml'
  )
}

gulp.task('jekyll-build', (done) => {
  return cp
    .spawn('bundle', buildCommand, { stdio: 'inherit' })
    .on('close', done)
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
