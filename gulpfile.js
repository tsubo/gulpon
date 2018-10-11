const gulp = require('gulp')
const runSequence = require('run-sequence')
const requireDir = require('require-dir')
const yaml = require('yamljs')

process.on('unhandledRejection', console.dir)

config = yaml.load('./config.yml')
process.env.NODE_THEME =
  config && config.hasOwnProperty('theme') ? config.theme : 'default'

requireDir('./gulp/tasks', { recurse: true })

// TODO: Add task for collection data(blog, news)
gulp.task('build', ['html', 'webpack', 'img'], () => {
  return
})

gulp.task('default', () => {
  runSequence('clean', 'build')
})
