const config = require('../../config')
const gulp = require('gulp')
const path = require('path')

gulp.task('watch', () => {
  gulp.watch(path.join(config.shuboxWeb.images.src, '**'), ['images'])
  gulp.watch(path.join(config.shuboxWeb.scripts.src, '**'), ['js'])
  gulp.watch(path.join(config.shuboxWeb.styles.src, '**'), ['sass'])
  gulp.watch(path.join(config.shuboxWeb.jekyll.src, '**'), ['jekyll-build'])
  gulp.watch(path.join(config.shuboxWeb.jekyll.tmp, '**'), ['jekyll-sync'])
})

gulp.task('default', ['browserSync', 'watch'])
