// javascript
import Popper from 'popper.js'
import jQuery from 'jquery'
import hljs from 'highlight.js/lib/index'
import Vue from 'vue'
import axios from 'axios'
import 'bootstrap'
import './site'

window.hljs = hljs
window.$ = window.jQuery = jQuery
window.Popper = Popper
window.Vue = Vue
window.axios = axios

// TODO: Add wordpress rest client components.
// TODO: Add local blog components.
import Example from './components/Example.vue'
Vue.component('example-component', Example)
