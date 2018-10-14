import VueRouter from 'vue-router'
import WpPostsIndex from './views/WpPostsIndex'
import WpPostsShow from './views/WpPostsShow'

// FIXME: add catch all & show 404
const routes = [
  {
    path: '/',
    component: WpPostsIndex,
    name: 'wp-posts-index',
  },
  {
    path: '/:slug',
    component: WpPostsShow,
    name: 'wp-posts-show',
  },
]

export default new VueRouter({
  // mode: 'history',
  base: window.location.pathname,
  routes,
})
