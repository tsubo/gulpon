const config = require('../config')
const gulp = require('gulp')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('../../webpack.config')
const util = require('../util')

gulp.task('webpack', ['clean'], () => {
  return webpackStream(webpackConfig, webpack)
    .on('error', util.swallowError)
    .pipe(gulp.dest(`${config.path.assetsDir}/js`))
})
