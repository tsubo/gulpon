const through = require('through2')
const nunjucks = require('nunjucks')
const PluginError = require('plugin-error')

// TODO: Add theme for documents
module.exports = function(templates) {
  const fileLoaders = templates.map(
    template => new nunjucks.FileSystemLoader(template),
  )
  const njkEnv = new nunjucks.Environment(fileLoaders)

  return through.obj(function(file, encoding, callback) {
    njkEnv.renderString(file.contents.toString(), file.data, (err, res) => {
      if (err) {
        return this.emit(
          'error',
          new PluginError('nunjucks', err, { fileName: file.path }),
        )
      }
      file.contents = Buffer.from(res || '')
      callback(null, file)
    })
  })
}
