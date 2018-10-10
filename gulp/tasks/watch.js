const config = require('../config')
const util = require('../util')
const gulp = require('gulp')

gulp.task('watch', ['build'], () => {
  gulp
    .watch(`${config.path.srcDir}/**/*`, ['build'])
    .on('error', util.swallowError)
  gulp
    .watch(`${config.path.templateDir}/**/*`, ['build'])
    .on('error', util.swallowError)
  gulp
    .watch(`${config.path.dataDir}/**/*`, ['build'])
    .on('error', util.swallowError)
})
