var config      = require('../../config');
var browserSync = require('browser-sync');
var gulp        = require('gulp');

gulp.task('browserSync', ['sass','js','jekyll-build'], () => {
  browserSync({
    server: {
      baseDir: config.shuboxWeb.jekyll.dest
    }
  })
})
