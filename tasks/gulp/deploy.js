var config = require('../../config')
var gulp = require('gulp')
var s3 = require('gulp-s3-upload')({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

gulp.task('deploy', () => {
  return gulp.src(config.shuboxWeb.jekyll.dest + '/**')
    .pipe(s3({
      Bucket: process.env.S3_BUCKET,
      ACL: 'public-read'
    }, {
      maxRetries: 5
    }))
})

