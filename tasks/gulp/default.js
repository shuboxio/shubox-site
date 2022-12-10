const config = require('../../config')
const gulp = require('gulp')
const path = require('path')
const del = require('del')

gulp.task('watch', () => {
  gulp.watch(path.join(config.shuboxWeb.jekyll.src, '**'),  gulp.series('jekyll-build'))
  gulp.watch(path.join(config.shuboxWeb.images.src, '**'),  gulp.series('images'))
  gulp.watch(path.join(config.shuboxWeb.scripts.src, '**'), gulp.series('js'))
  gulp.watch(path.join(config.shuboxWeb.styles.src, '**'),  gulp.series('sass'))
  gulp.watch(path.join(config.shuboxWeb.jekyll.tmp, '**'),  gulp.series('jekyll-sync'))
})

gulp.task('clean', function () {
  return del(['public/*'])
})

gulp.task(
  'build',
  gulp.series([
    'clean',
    'images',
    'svg',
    'js',
    'sass',
    'jekyll-build',
    'jekyll-sync',
  ]),
)

gulp.task('default', gulp.series(['browserSync', 'watch']))
