const config = require('../config')
const gulp = require('gulp')

gulp.task('img', () => {
  return gulp
    .src(`${config.path.imgDir}/**/*`)
    .pipe(gulp.dest(`${config.path.destDir}/img`))
})
