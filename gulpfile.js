const gulp = require('gulp')
const render = require('gulp-nunjucks-render')
const gulpData = require('gulp-data')
const beautify = require('gulp-html-beautify')
const frontMatter = require('front-matter')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const marked = require('marked')
const highlight = require('highlight.js')
const notifier = require('node-notifier')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const brsync = require('browser-sync')
const runSequence = require('run-sequence')
const del = require('del')
const glob = require('glob')
const yaml = require('yamljs')
const pathUtil = require('path')

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

marked.setOptions({
  highlight: code => {
    return highlight.highlightAuto(code).value
  },
})

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

function swallowError(error) {
  console.log(error.toString())
  notifier.notify({
    title: 'Error',
    message: error.message,
  })
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
    .src([`${PATHS.srcDir}/**/*.{njk,md}`])
    .pipe(
      plumber({
        errorHandler: notify.onError('<%= error.message %>'),
      }),
    )
    .pipe(
      gulpData(file => {
        // markdown
        if (pathUtil.extname(file.path) == '.md') {
          // front matter
          const content = frontMatter(String(file.contents))
          data = { ...data, ...content.attributes }
          if (!data.layout) {
            throw new Error(`Missing "layout" in Front matter => ${file.path}`)
          }

          // compile
          const html = marked(content.body)
          data = { ...data, markdown: html }
          file.contents = Buffer.from(`{% extends '${data.layout}' %}`)
        }
        return data
      }),
    )
    .pipe(
      render({
        path: [PATHS.templateDir],
      }),
    )
    .pipe(
      beautify({
        indent_size: 2,
        preserve_newlines: false,
      }),
    )
    .pipe(gulp.dest(PATHS.destDir))
})

gulp.task('webpack', () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
      }),
    )
    .pipe(gulp.dest(`${PATHS.destDir}/js`))
})

gulp.task('img', () => {
  return gulp
    .src(`${PATHS.imgDir}/**/*`)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
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
