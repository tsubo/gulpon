const theme = process.env.NODE_THEME || 'default'

// css
import 'highlight.js/styles/atom-one-dark.css'

// scss
import './variables.scss'
import 'bootstrap/scss/bootstrap.scss'
require(`@root/theme/${theme}/sass/theme.scss`)
import '@root/template/sass/template.scss'
import './site.scss'
