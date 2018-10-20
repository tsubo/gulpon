const gulp = require('gulp')
const plumber = require('gulp-plumber')
const gulpData = require('gulp-data')
const beautify = require('gulp-html-beautify')
const rename = require('gulp-rename')

const glob = require('glob')
const yaml = require('yamljs')
const merge = require('deepmerge')

const paths = require('../common').paths
const errorHandler = require('../common').errorHandler
const frontMatter = require('../plugin/front-matter')
const markdown = require('../plugin/markdown')
const nunjucks = require('../plugin/nunjucks')

function getData() {
  let data = {}
  glob // json
    .sync(paths.data.json)
    .forEach(file => (data = { ...data, ...require(file) }))
  glob // yaml
    .sync(paths.data.yaml)
    .forEach(file => (data = { ...data, ...yaml.load(file) }))

  const mode = process.env.NODE_MODE || 'development'
  const modeData = data[mode]
  data = merge(data, modeData)

  return data
}

// TODO: Add TOC parser
// TODO: Add PWA
// TODO: Add Sitemap
function html() {
  const data = getData()

  return gulp
    .src(paths.html.src)
    .pipe(
      plumber({
        errorHandler: errorHandler,
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
    .pipe(nunjucks(paths.templates))
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
    .pipe(gulp.dest(paths.html.dest))
}

module.exports = html
