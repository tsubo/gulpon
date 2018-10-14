const config = require('../config')
const gulp = require('gulp')
const brsync = require('browser-sync')

gulp.task('reload', () => {
  brsync.reload()
})

gulp.task('server', ['clean', 'watch'], () => {
  brsync.init({
    notify: false,
    server: config.path.destDir,
  })
  gulp.watch(`${config.path.destDir}/**/*`, ['reload'])
})
