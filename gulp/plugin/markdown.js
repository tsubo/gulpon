const through = require('through2')
const highlight = require('highlight.js')
const unescape = require('lodash.unescape')
const marked = require('marked')
const path = require('path')
const PluginError = require('plugin-error')

const mdRender = new marked.Renderer()
mdRender.text = text => unescape(text)
marked.setOptions({
  render: mdRender,
  highlight: code => {
    return highlight.highlightAuto(code).value
  },
})

const renderMarkdown = function(file) {}

module.exports = function() {
  return through.obj(function(file, encoding, callback) {
    const isMarkdown = /\.md/.test(path.extname(file.path))
    if (isMarkdown) {
      if (!file.data.hasOwnProperty('layout')) {
        this.emit(
          'error',
          new PluginError('markdown', 'Layout undefined in front-matter'),
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
    callback(null, file)
  })
}
