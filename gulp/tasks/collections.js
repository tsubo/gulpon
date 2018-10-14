const config = require('../config')
const gulp = require('gulp')
const jdown = require('jdown')
const fs = require('fs-extra')

gulp.task('collections', () => {
  let option = { spaces: '  ' }
  if (process.env.NODE_MODE === 'production') {
    option = {}
  }

  jdown(config.path.collectionsDir)
    .then(contents => {
      for (key in contents) {
        // TODO: 日付でソートすること
        fs.outputJsonSync(
          `${config.path.destDir}/collections/${key}.json`,
          contents[key],
          option,
        )
      }
    })
    .catch(err => console.log(err))
  return
})
