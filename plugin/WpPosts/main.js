import WpPosts from './page/WpPosts.vue'

export function install(Vue) {
  Vue.component('wp-posts', WpPosts)
}

const plugin = {
  install,
}

window.Vue.use(plugin)
