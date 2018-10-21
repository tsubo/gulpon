// javascript
import Popper from 'popper.js'
import jQuery from 'jquery'
import axios from 'axios'
import Vue from 'vue'
import 'bootstrap'
import './highlight'
import './site'

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
