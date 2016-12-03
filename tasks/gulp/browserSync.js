var config      = require('../../config');
var browserSync = require('browser-sync');
var gulp        = require('gulp');

gulp.task('browserSync', ['js', 'sass', 'jekyll-build'], () => {
  browserSync({
    server: {
      baseDir: config.shuboxWeb.jekyll.dest
    }
  })
})
