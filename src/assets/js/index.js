// javascript
import Popper from 'popper.js'
import jQuery from 'jquery'
import hljs from 'highlight.js/lib/index'
import Vue from 'vue'
import 'bootstrap'
import './site'
import axios from 'axios'

window.hljs = hljs
window.$ = window.jQuery = jQuery
window.Popper = Popper
window.Vue = Vue
window.axios = axios

// vue components
import Example from './component/Example.vue'
import JsonPostsIndex from './component/JsonPosts/JsonPostsIndex.vue'
import JsonPostsShow from './component/JsonPosts/JsonPostsShow.vue'

Vue.component('example-component', Example)
Vue.component('json-posts-index', JsonPostsIndex)
Vue.component('json-posts-show', JsonPostsShow)
