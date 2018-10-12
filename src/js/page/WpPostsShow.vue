<template>
  <div>
    <!-- FIXME: 見栄えをよくする -->
    <template v-if="post">
      <h1>{{ post.title.rendered }}</h1>
      <p>slug: {{ $route.params.slug }}</p>
      <a :href="post.link">{{ post.link }}</a>
      <hr>
      <div v-html="post.content.rendered"></div>
    </template>

    <loading :active.sync="isLoading" color="white" background-color="black"></loading>
  </div>
</template>

<script>
  import Loading from 'vue-loading-overlay'
  import 'vue-loading-overlay/dist/vue-loading.css'

  // FIXME: post データが取得できない時は 404 を返す
  const axios = require('axios')

  export default {
    components: {
      Loading
    },
    data: () => {
      return {
        post: null,
        isLoading: false
      }
    },
    created() {
      this.getPost(this.$route.params.slug)
    },
    beforeRouteUpdate (to, from, next) {
      this.getPost(to.params.slug)
      next()
    },
    methods: {
      getPost(slug) {
        this.isLoading = true
        axios.get(`${this.$store.state.apiUrl}?slug=${slug}`)
          .then(res => {
            this.post = res.data[0]
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    }
  }
</script>

