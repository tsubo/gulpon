// javascript
import Popper from 'popper.js'
import jQuery from 'jquery'
import hljs from 'highlight.js/lib/index'
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import 'bootstrap'
import './site'

window.hljs = hljs
window.$ = window.jQuery = jQuery
window.Popper = Popper
window.Vue = Vue
window.axios = axios

// Vue Component
import Example from './component/Example.vue'
Vue.component('example-component', Example)

// FIXME: SPA 用の js ファイルを別ファイルに切り出せないか？
// Vue Single Page Application
import WpNews from './page/WpNews.vue'
Vue.component('wp-news', WpNews)

Vue.use(VueRouter)

// TODO: Add wordpress rest client components.
// TODO: Add local blog components.
