import VueRouter from 'vue-router'
import JsonPostsIndex from './views/JsonPostsIndex'
import JsonPostsShow from './views/JsonPostsShow'
const routes = [
  {
    path: '/',
    component: JsonPostsIndex,
    name: 'json-posts-index',
  },
  {
    path: '/:slug',
    component: JsonPostsShow,
    name: 'json-posts-show',
  },
]

export default new VueRouter({
  // mode: 'history',
  base: window.location.pathname,
  routes,
})
