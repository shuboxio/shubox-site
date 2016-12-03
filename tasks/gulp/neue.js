var argv = require('yargs')
  .alias('t', 'template')
  .alias('j', 'js')
  .argv
var chalk = require('chalk')
var config = require('../../config')
var fs = require('fs')
var gulp = require('gulp')
var path = require('path')

function makeSassFile (key) {
  return fs.open(path.join(config.src, 'sass', '_' + key, '_' + argv[key] + '.sass'), 'wx', function (err) {
    if (err) console.log(err)
  })
}

function makeTemplateFile (key) {
  if (key === 'block') {
    return fs.open(path.join(config.src, 'templates/', '_' + key, argv[key] + '.twig'), 'wx', function (err) {
      if (err) console.log(err)
      console.log(chalk.green.bold(`Created "src/templates/_${key}/${argv[key]}.twig"`))
    })
  }
}

function appendToAllSass (key) {
  return fs.appendFile(
    path.join(config.src, 'sass', '_' + key, '_all.sass'),
    `\n@import "_${key}/${argv[key]}"`,
    function (err) {
      if (err) console.log(err)
      console.log(chalk.green.bold(`Created "src/sass/_${key}/_${argv[key]}.sass"`))
    }
  )
}

function makeJsFile (key) {
  return fs.openSync(path.join(config.src, 'js', '_' + key, argv[key] + '.js'), 'wx', function (err) {
    if (err) console.log(err)
  })
}

function appendToMainJs (key) {
  return fs.appendFile(
    path.join(config.src, 'js', 'main.js'),
    `\nrequire('_${key}/${argv[key]}.js')`,
    function (err) {
      if (err) console.log(err)
      console.log(chalk.green.bold(`Created "src/js/_${key}/${argv[key]}"`))
    }
  )
}

gulp.task('neue', function () {
  // console.log(argv)
  for (var key in argv) {
    if (argv.hasOwnProperty(key) &&
      key !== '_' &&
      key !== '$0' &&
      key !== 'j' &&
      key !== 'js' &&
      key !== 't' &&
      key !== 'template'
    ) {
      makeSassFile(key)
      appendToAllSass(key)

      if (argv.js === true) {
        makeJsFile(key)
        appendToMainJs(key)
      }

      if (argv.template === true) {
        makeTemplateFile(key)
      }
    }
  }
})
