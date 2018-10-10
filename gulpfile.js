const gulp = require('gulp')
const runSequence = require('run-sequence')
const requireDir = require('require-dir')

requireDir('./gulp/tasks', { recurse: true })

process.on('unhandledRejection', console.dir)

gulp.task('build', ['html', 'webpack', 'img'], () => {
  return
})

gulp.task('default', () => {
  runSequence('clean', 'build')
})
