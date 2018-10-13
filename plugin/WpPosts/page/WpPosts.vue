<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import router from './router'
import store from './store'

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
