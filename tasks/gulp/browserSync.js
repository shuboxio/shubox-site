var config = require('../../config')
var browserSync = require('browser-sync')
var gulp = require('gulp')

gulp.task('browserSync', ['sass', 'js', 'jekyll-build'], () => {
  browserSync({
    port: 5000,
    server: {
      baseDir: config.shuboxWeb.jekyll.dest
    }
  })
})
