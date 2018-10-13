/**
 * Vue Global Compornents
 */
import Example from './component/Example.vue'

export function install(Vue) {
  Vue.component('example-component', Example)
}

const plugin = {
  install,
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}