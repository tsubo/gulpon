const gulp = require('gulp')
const runSequence = require('run-sequence')
const requireDir = require('require-dir')
const yaml = require('yamljs')

process.on('unhandledRejection', console.dir)

config = yaml.load('./config.yml')
process.env.NODE_THEME =
  config && config.hasOwnProperty('theme') ? config.theme : 'default'

requireDir('./gulp/tasks', { recurse: true })

gulp.task('build', ['html', 'webpack', 'collections', 'img', 'file'], () => {
  return
})

gulp.task('default', () => {
  runSequence('clean', 'build')
})
