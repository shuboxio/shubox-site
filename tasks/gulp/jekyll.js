var gulp        = require('gulp');
var config      = require('../../config');
var browserSync = require('browser-sync');
var cp          = require('child_process');
var messages    = { jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build' };

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);

  return cp.spawn(
    'jekyll' ,
    [
      'build',
      '--source',
      config.neue.jekyll.src,
      '--destination',
      config.neue.jekyll.dest
    ],
    { stdio: 'inherit' }
  ).on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});
