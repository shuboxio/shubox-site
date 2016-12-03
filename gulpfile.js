/**
 * gulpfile.js
 * ==============================
 * Require all gulp tasks. Tasks should be small, modular, and driven
 * off of values from config.json
 */

var requireDir = require('require-dir')

requireDir('./tasks/gulp', { recurse: true })
