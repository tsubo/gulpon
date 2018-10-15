const config = require('../config')
const util = require('../util')
const gulp = require('gulp')

gulp.task('watch', ['build'], () => {
  gulp
    .watch(`${config.path.srcDir}/**/*.{html,njk,md}`, ['html'])
    .on('error', util.swallowError)
  gulp
    .watch(`${config.path.srcDir}/**/*.{js,css,scss,vue}`, ['webpack'])
    .on('error', util.swallowError)
  gulp
    .watch(`${config.path.imgDir}/**/*`, ['img'])
    .on('error', util.swallowError)
  gulp
    .watch(`${config.path.templateDir}/**/*.{html,njk}`, ['html'])
    .on('error', util.swallowError)
  gulp
    .watch(`${config.path.dataDir}/**/*.{yml,yaml,json}`, ['html'])
    .on('error', util.swallowError)
})
