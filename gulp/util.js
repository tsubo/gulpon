const notifier = require('node-notifier')

function errorHandler(error) {
  console.log(error.toString())
  notifier.notify({
    title: error.plugin,
    message: error.message,
  })
}

function swallowError(error) {
  errorHandler(error)
  this.emit('end')
}

module.exports = {
  errorHandler: errorHandler,
  swallowError: swallowError,
}
