const config = require('../config')
const gulp = require('gulp')
const jdown = require('jdown')
const fs = require('fs-extra')

gulp.task('collections', () => {
  jdown(config.path.collectionsDir)
    .then(contents => {
      for (key in contents) {
        // TODO: 日付でソートすること
        fs.outputJsonSync(
          `${config.path.destDir}/collections/${key}.json`,
          contents[key],
          { spaces: '  ' },
        )
      }
    })
    .catch(err => console.log(err))
  return
})
