const gulp = require('gulp')
const njkMd = require('gulp-nunjucks-md')
const gulpData = require('gulp-data')
const beautify = require('gulp-html-beautify')
const rename = require('gulp-rename')
const plumber = require('gulp-plumber')
const highlight = require('highlight.js')
const notifier = require('node-notifier')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const brsync = require('browser-sync')
const runSequence = require('run-sequence')
const del = require('del')
const glob = require('glob')
const yaml = require('yamljs')

/**
 * init
 */
const webpackConfig = require('./webpack.config')

const PATHS = {
  srcDir: './src',
  templateDir: './template',
  imgDir: './src/img',
  dataDir: './data',
  destDir: './public',
}

/**
 * function
 */
const getData = () => {
  let data = {}
  glob // yaml
    .sync(`${PATHS.dataDir}/**/*.yml`)
    .forEach(file => (data = { ...data, ...yaml.load(file) }))
  glob // json
    .sync(`${PATHS.dataDir}/**/*.json`)
    .forEach(file => (data = { ...data, ...require(file) }))
  return data
}

function errorHandler(error) {
  console.log(error.toString())
  notifier.notify({
    title: error.plugin,
    message: error.message,
  })
}

function swallowError(error) {
  errorHandler(error)
  this.emit('end')
}

/**
 * tasks
 */
gulp.task('clean', cb => {
  del([`${PATHS.destDir}/**/*`]).then(() => cb())
})

gulp.task('html', () => {
  let data = getData()

  return gulp
    .src([`${PATHS.srcDir}/**/*.{html,njk,md}`])
    .pipe(
      plumber({
        errorHandler: errorHandler,
      }),
    )
    .pipe(
      gulpData(file => {
        return data
      }),
    )
    .pipe(
      njkMd({
        path: [PATHS.templateDir],
        extLayout: '',
        marked: {
          highlight: code => {
            return highlight.highlightAuto(code).value
          },
        },
      }),
    )
    .pipe(
      beautify({
        indent_size: 2,
        preserve_newlines: false,
      }),
    )
    .pipe(
      rename({
        extname: '.html',
      }),
    )
    .pipe(gulp.dest(PATHS.destDir))
})

gulp.task('webpack', () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(
      plumber({
        errorHandler: errorHandler,
      }),
    )
    .pipe(gulp.dest(`${PATHS.destDir}/js`))
})

gulp.task('img', () => {
  return gulp
    .src(`${PATHS.imgDir}/**/*`)
    .pipe(
      plumber({
        errorHandler: errorHandler,
      }),
    )
    .pipe(gulp.dest(`${PATHS.destDir}/img`))
})

gulp.task('build', ['html', 'webpack', 'img'], () => {
  return
})

gulp.task('watch', ['build'], () => {
  gulp.watch(`${PATHS.srcDir}/**/*`, ['build']).on('error', swallowError)
  gulp.watch(`${PATHS.templateDir}/**/*`, ['build']).on('error', swallowError)
  gulp.watch(`${PATHS.dataDir}/**/*`, ['build']).on('error', swallowError)
})

gulp.task('reload', () => {
  brsync.reload()
})

gulp.task('server', ['default', 'watch'], () => {
  brsync.init({
    notify: false,
    server: PATHS.destDir,
  })
  gulp.watch(`${PATHS.destDir}/**/*`, ['reload'])
})

gulp.task('default', () => {
  runSequence('clean', 'build')
})
