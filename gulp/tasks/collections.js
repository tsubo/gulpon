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
      for (dirname in contents) {
        // TODO: 日付でソートすること
        fs.outputJsonSync(
          `${config.path.destDir}/collections/${dirname}/index.json`,
          contents[dirname],
          option,
        )
        for (filename in contents[dirname]) {
          fs.outputJsonSync(
            `${config.path.destDir}/collections/${dirname}/${filename}.json`,
            contents[dirname][filename],
            option,
          )
        }
      }
    })
    .catch(err => console.log(err))
  return
})
