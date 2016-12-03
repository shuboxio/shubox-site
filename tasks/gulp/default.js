var config = require('../../config');
var gulp = require('gulp');
var path = require('path');
var browserSync = require('browser-sync');

gulp.task('watch', () => {
  gulp.watch(path.join(config.shuboxWeb.styles.src, '**'), ['sass'])
  gulp.watch(path.join(config.shuboxWeb.scripts.src, '**'), ['js'])
  gulp.watch(path.join(config.shuboxWeb.jekyll.src, '**'), ['jekyll-rebuild'])
    .on('change', browserSync.reload)
});

gulp.task('default', ['browserSync', 'watch']);
