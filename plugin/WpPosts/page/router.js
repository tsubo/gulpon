import VueRouter from 'vue-router'
import WpPostsIndex from './WpPostsIndex'
import WpPostsShow from './WpPostsShow'

window.Vue.use(VueRouter)

// FIXME: add catch all & show 404
export default new VueRouter({
  mode: 'history',
  base: window.location.pathname,
  routes: [
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
  ],
})
