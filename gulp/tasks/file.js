const config = require('../config')
const gulp = require('gulp')

gulp.task('file', () => {
  return gulp
    .src(`${config.path.srcDir}/_redirects`)
    .pipe(gulp.dest(`${config.path.destDir}`))
})