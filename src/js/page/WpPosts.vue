<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import WpPostsIndex from './WpPostsIndex'
import WpPostsShow from './WpPostsShow'

// FIXME: add catch all & show 404
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: window.location.pathname,
  routes: [
    {
      path: '/',
      component: WpPostsIndex,
      name: 'wp-posts-index'
    },
    {
      path: '/:slug',
      component: WpPostsShow,
      name: 'wp-posts-show'
    },
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
  props: {
    'apiUrl': {
      type: String,
      required: true
    }
  },
  router,
  store,
  created() {
    this.$store.commit('setApiUrl', this.apiUrl)
  },
}
</script>
