var config = require('../../config')
var browserSync = require('browser-sync')
var gulp = require('gulp')

gulp.task('browserSync', () => {
  browserSync({
    proxy: config.env.local.url
  })
})
