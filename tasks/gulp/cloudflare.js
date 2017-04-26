const config = require('../../config')
const gulp = require('gulp')
const cloudflare = require('gulp-cloudflare')

gulp.task('cloudflare', function () {
  cloudflare({
    token: process.env.CLOUDFLARE_TOKEN,
    email: process.env.CLOUDFLARE_EMAIL,
    domain: process.env.CLOUDFLARE_DOMAIN
  })
})
