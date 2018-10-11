const config = require('../config')
const through = require('through2')
const nunjucks = require('nunjucks')
const PluginError = require('plugin-error')

module.exports = function() {
  // TODO: Add theme system
  // TODO: Add theme for documents
  const njkEnv = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(config.path.templateDir),
  )

  return through.obj(function(file, encoding, callback) {
    try {
      file.contents = Buffer.from(
        njkEnv.renderString(file.contents.toString(), file.data),
      )
    } catch (err) {
      this.emit(
        'error',
        new PluginError('nunjucks', err, {
          fileName: file.path,
        }),
      )
    }
    callback(null, file)
  })
}
