const theme = process.env.NODE_THEME || 'default'

// css
import 'highlight.js/styles/atom-one-dark.css'

// scss
import './variables.scss'
import 'bootstrap/scss/bootstrap.scss'
require(`../../theme/${theme}/sass/theme.scss`)
import '../../template/sass/template.scss'
import './site.scss'
