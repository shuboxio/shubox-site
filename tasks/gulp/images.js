const browserSync = require('browser-sync')
const config = require('../../config')
const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const path = require('path')

function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}

// Minify images and copy to public
gulp.task('images', () => {
  return gulp.src(path.join(config.shuboxWeb.images.src, '**'))
    .pipe(imagemin()).on('error', errorHandler)
    .pipe(gulp.dest(config.shuboxWeb.images.dest))
    .pipe(browserSync.stream({ match: '**/*.png,**/*.jpg,**/*.gif' }))
})
