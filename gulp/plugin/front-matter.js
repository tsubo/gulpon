const through = require('through2')
const fm = require('front-matter')
const path = require('path')

const frontMatter = file => {
  const content = fm(file.contents.toString())

  // Don't use front matter when using Nunjucks templates
  const isNjk = /\.njk/.test(path.extname(file.path))
  if (!isNjk) {
    file.data = { ...file.data, ...content.attributes }
  }

  file.contents = new Buffer.from(content.body)
  return file
}

module.exports = function() {
  return through.obj(function(file, encoding, callback) {
    callback(null, frontMatter(file))
  })
}
