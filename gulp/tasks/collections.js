const jdown = require('jdown')
const fs = require('fs-extra')

const paths = require('../common').paths

function collections() {
  let option = { spaces: '  ' }
  if (process.env.NODE_MODE === 'production') {
    option = {}
  }

  return jdown(paths.collections.src)
    .then(contents => {
      for (dirname in contents) {
        // TODO: 日付でソートすること
        fs.outputJsonSync(
          `${paths.collections.dest}/${dirname}/index.json`,
          contents[dirname],
          option,
        )
        for (filename in contents[dirname]) {
          fs.outputJsonSync(
            `${paths.collections.dest}/${dirname}/${filename}.json`,
            contents[dirname][filename],
            option,
          )
        }
      }
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = collections
