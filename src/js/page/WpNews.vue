<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import WpNewsIndex from './WpNewsIndex'
import WpNewsPost from './WpNewsPost'

const router = new VueRouter({
  routes: [
    { path: '/', component: WpNewsIndex, name: 'wp-news-index' },
    { path: '/:slug', component: WpNewsPost, name: 'wp-news-post' },
  ]
})

export default {
  router
}
</script>
