<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import WpPostsIndex from './WpPostsIndex'
import WpPostsShow from './WpPostsShow'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', component: WpPostsIndex, name: 'wp-posts-index' },
    { path: '/:slug', component: WpPostsShow, name: 'wp-posts-show' },
  ]
})

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    apiUrl: ''
  },
  mutations: {
    setApiUrl (state, apiUrl) {
      state.apiUrl = apiUrl
    }
  }
})

export default {
  props: [ 'apiUrl' ],
  router,
  store,
  created() {
    this.$store.commit('setApiUrl', this.apiUrl)
  },
}
</script>
