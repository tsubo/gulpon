const config = require('../config')
const gulp = require('gulp')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('../../webpack.config')

// FIXME: コンパイルがエラーのとき、サーバーが止まってしまう
gulp.task('webpack', () => {
  return webpackStream(webpackConfig, webpack).pipe(
    gulp.dest(`${config.path.destDir}/js`),
  )
})
