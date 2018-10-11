const config = require('../config')
const util = require('../util')
const gulp = require('gulp')
const gulpData = require('gulp-data')
const beautify = require('gulp-html-beautify')
const rename = require('gulp-rename')
const plumber = require('gulp-plumber')
const glob = require('glob')
const yaml = require('yamljs')
const frontMatter = require('../plugin/front-matter')
const markdown = require('../plugin/markdown')
const nunjucks = require('../plugin/nunjucks')

const getData = () => {
  let data = {}
  glob // yaml
    .sync(`${config.path.dataDir}/**/*.{yml,yaml}`)
    .forEach(file => (data = { ...data, ...yaml.load(file) }))
  glob // json
    .sync(`${config.path.dataDir}/**/*.json`)
    .forEach(file => (data = { ...data, ...require(file) }))
  return data
}

// TODO: Add TOC parser
// TODO: Add PWA
gulp.task('html', () => {
  const data = getData()

  return gulp
    .src([`${config.path.srcDir}/**/*.{html,njk,md}`])
    .pipe(
      plumber({
        errorHandler: util.errorHandler,
      }),
    )
    .pipe(frontMatter())
    .pipe(
      gulpData(file => {
        // Inject data from yaml or json files
        return data
      }),
    )
    .pipe(markdown())
    .pipe(nunjucks())
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
    .pipe(gulp.dest(config.path.destDir))
})
