const notifier = require('node-notifier')
const yaml = require('yamljs')

const config = yaml.load('./config.yml')

process.env.NODE_THEME =
  config && config.hasOwnProperty('theme') ? config.theme : 'default'

const paths = {
  html: {
    src: './src/**/*.{html,njk,md}',
    dest: './public',
  },
  webpack: {
    config: './webpack.config',
    watch: './src/assets/**/*.{js,css,scss,vue}',
  },
  collections: {
    src: './collections',
    dest: './public/collections',
  },
  img: {
    src: './src/assets/img/**/*',
    dest: './public/assets/img',
  },
  data: {
    json: './data/**/*.json',
    yaml: './data/**/*.{yml,yaml}',
    watch: './data/**/*.{json,yml,yaml}',
  },
  template: {
    watch: './template/**/*.{html,njk}',
  },
  templates: ['./template', `./theme/${process.env.NODE_THEME}`],
}

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
  paths: paths,
  errorHandler: errorHandler,
  swallowError: swallowError,
}
