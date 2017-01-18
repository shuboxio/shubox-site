const config = require('../../config')
const gulp = require('gulp')
const path = require('path')
const svgstore = require('gulp-svgstore')
const rename = require('gulp-rename')
const inject = require('gulp-inject')
const debug = require('gulp-debug')

gulp.task('svg', function () {
  var svgs = gulp.src(path.join(config.shuboxWeb.svg.src, '*.svg'))
    .pipe(svgstore({ inlineSvg: true }))

  function fileContents (filePath, file) {
    return file.contents.toString('utf8')
  }

  return gulp.src(path.join(config.shuboxWeb.jekyll.src, '_includes/_precompile-svg.html'))
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(rename('svg.html'))
    .pipe(debug({title: 'file:'}))
    .pipe(gulp.dest(path.join(config.shuboxWeb.jekyll.src, '_includes')))
})