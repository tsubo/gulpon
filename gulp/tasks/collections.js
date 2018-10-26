const jdown = require('jdown')
const fs = require('fs-extra')

const paths = require('../common').paths

function objectToArray(collectionObject) {
  return Object.entries(collectionObject)
}

function arrayToObject(collectionArray) {
  const obj = collectionArray.reduce((accumulator, currentValue) => {
    accumulator[currentValue[0]] = currentValue[1]
    return accumulator
  }, {})
  return obj
}

function orderByDateDesc(collectionObject) {
  let collectionArray = objectToArray(collectionObject)
  collectionArray.sort((a, b) => {
    return b[1].date - a[1].date
  })
  return arrayToObject(collectionArray)
}

function collections() {
  let option = { spaces: '  ' }
  if (process.env.NODE_MODE === 'production') {
    option = {}
  }

  return jdown(paths.collections.src)
    .then(contents => {
      for (dirname in contents) {
        fs.outputJsonSync(
          `${paths.collections.dest}/${dirname}/index.json`,
          orderByDateDesc(contents[dirname]),
          option
        )
        for (filename in contents[dirname]) {
          fs.outputJsonSync(
            `${paths.collections.dest}/${dirname}/${filename}.json`,
            contents[dirname][filename],
            option
          )
        }
      }
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = collections
