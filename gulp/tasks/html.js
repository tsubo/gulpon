const config = require('../config')
const util = require('../util')
const gulp = require('gulp')
const through = require('through2')
const nunjucks = require('nunjucks')
const marked = require('marked')
const highlight = require('highlight.js')
const unescape = require('lodash.unescape')
const fm = require('front-matter')
const gulpData = require('gulp-data')
const beautify = require('gulp-html-beautify')
const rename = require('gulp-rename')
const plumber = require('gulp-plumber')
const glob = require('glob')
const yaml = require('yamljs')
const path = require('path')
const PluginError = require('plugin-error')

/**
 * function
 */
const getData = () => {
  let data = {}
  glob // yaml
    .sync(`${config.path.dataDir}/**/*.yml`)
    .forEach(file => (data = { ...data, ...yaml.load(file) }))
  glob // json
    .sync(`${config.path.dataDir}/**/*.json`)
    .forEach(file => (data = { ...data, ...require(file) }))
  return data
}

/**
 * tasks
 */
gulp.task('html', () => {
  const data = getData()

  const mdRender = new marked.Renderer()
  mdRender.text = text => unescape(text)
  marked.setOptions({
    render: mdRender,
    highlight: code => {
      return highlight.highlightAuto(code).value
    },
  })
  const njkEnv = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(config.path.templateDir),
  )

  function frontMatter(file, enc, cb) {
    const content = fm(file.contents.toString())

    // Don't use front matter when using Nunjucks templates
    const isNjk = /\.njk/.test(path.extname(file.path))
    if (!isNjk) {
      file.data = { ...file.data, ...content.attributes }
    }

    file.contents = new Buffer.from(content.body)
    cb(null, file)
  }

  function renderMarkdown(file, enc, cb) {
    const isMarkdown = /\.md/.test(path.extname(file.path))
    if (isMarkdown) {
      if (!file.data.hasOwnProperty('layout')) {
        this.emit(
          'error',
          new PluginError(
            'gulp task: html.renderMarkdown',
            'Layout undefined in front-matter',
          ),
        )
      }
      let contents = marked(file.contents.toString())
      contents = `
        {% extends '${file.data.layout}' %}
        {% block content %}
          ${contents}
        {% endblock %}`
      file.contents = new Buffer.from(contents)
    }
    cb(null, file)
  }

  function renderNunjucks(file, enc, cb) {
    try {
      file.contents = Buffer.from(
        njkEnv.renderString(file.contents.toString(), file.data),
      )
    } catch (err) {
      this.emit(
        'error',
        new PluginError('gulp task: html.renderNunjucks', err, {
          fileName: file.path,
        }),
      )
    }
    cb(null, file)
  }

  return gulp
    .src([`${config.path.srcDir}/**/*.{html,njk,md}`])
    .pipe(
      plumber({
        errorHandler: util.errorHandler,
      }),
    )
    .pipe(through.obj(frontMatter))
    .pipe(
      gulpData(file => {
        // Inject data from yaml or json files
        return data
      }),
    )
    .pipe(through.obj(renderMarkdown))
    .pipe(through.obj(renderNunjucks))
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
