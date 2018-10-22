import hljs from 'highlight.js/lib/highlight'

import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import javascript from 'highlight.js/lib/languages/javascript'
import php from 'highlight.js/lib/languages/php'
import markdown from 'highlight.js/lib/languages/markdown'

hljs.registerLanguage('css', css)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('php', php)
hljs.registerLanguage('markdown', markdown)

window.hljs = hljs
