const gulp = require('gulp')
const webpack = require('webpack')
const brsync = require('browser-sync')
const del = require('del')

const paths = require('./gulp/common').paths
const swallowError = require('./gulp/common').swallowError

const html = require('./gulp/tasks/html')
const collections = require('./gulp/tasks/collections')

process.on('unhandledRejection', console.dir)

function clean() {
  return del([`${paths.html.dest}/**/*`])
}

function img() {
  return gulp.src(paths.img.src).pipe(gulp.dest(paths.img.dest))
}

function script() {
  return new Promise(resolve =>
    webpack(require(paths.webpack.config), (err, stats) => {
      if (err) {
        console.log('Webpack', err)
      }
      console.log(
        stats.toString({
          modules: false,
          moduleTrace: false,
          children: false,
        })
      )
      resolve()
    })
  )
}

function watch_src(callback) {
  gulp.watch(paths.html.src, html).on('error', swallowError)
  gulp.watch(paths.webpack.watch, script).on('error', swallowError)
  gulp.watch(paths.img.src, img).on('error', swallowError)
  gulp.watch(paths.data.watch, html).on('error', swallowError)
  gulp.watch(paths.template.watch, html).on('error', swallowError)
  callback()
}

function watch_dest(callback) {
  brsync.init({
    notify: false,
    server: paths.html.dest,
  })
  gulp.watch(`${paths.html.dest}/**/*`, () => brsync.reload())
  callback()
}

const build = gulp.series(clean, gulp.parallel(html, script, collections, img))
const serve = gulp.series(build, watch_src, watch_dest)

exports.clean = gulp.series(clean)
exports.serve = serve
exports.build = build
exports.default = build
