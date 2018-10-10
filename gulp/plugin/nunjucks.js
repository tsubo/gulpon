const config = require('../config')
const through = require('through2')
const nunjucks = require('nunjucks')
const PluginError = require('plugin-error')

const njkEnv = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(config.path.templateDir),
)

const renderNunjucks = file => {
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
  return file
}

module.exports = function() {
  return through.obj(function(file, encoding, callback) {
    callback(null, renderNunjucks(file))
  })
}
