const config = require('../../config')
const gulp = require('gulp')
const path = require('path')

gulp.task('watch', () => {
  gulp.watch(path.join(config.shuboxWeb.images.src, '**'), ['images'])
  gulp.watch(path.join(config.shuboxWeb.styles.src, '**'), ['sass'])
  gulp.watch(path.join(config.shuboxWeb.scripts.src, '**'), ['js'])
  gulp.watch(path.join(config.shuboxWeb.jekyll.src, '**'), ['jekyll-build'])
  gulp.watch(path.join(config.shuboxWeb.jekyll.tmp, '**'), ['jekyll-sync'])

  if (process.env.S3_CODEPEN_BUCKET &&
    process.env.AWS_ACCESS_KEY &&
    process.env.AWS_SECRET_KEY) {
    gulp.watch(path.join(config.shuboxWeb.styles.dest, './codepen.css'), ['codepen'])
  }
})

gulp.task('default', ['browserSync', 'watch'])
