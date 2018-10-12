<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import WpPostsIndex from './WpPostsIndex'
import WpPostsShow from './WpPostsShow'

const router = new VueRouter({
  routes: [
    { path: '/', component: WpPostsIndex, name: 'wp-posts-index' },
    { path: '/:slug', component: WpPostsShow, name: 'wp-posts-show' },
  ]
})

export default {
  router
}
</script>
