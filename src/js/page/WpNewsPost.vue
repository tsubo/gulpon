<template>
  <div>
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

  const axios = require('axios')
  const url = 'https://wordpress.org/news/wp-json/wp/v2/posts'

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
    mounted() {
      this.getPost(this.$route.params.slug)
    },
    beforeRouteUpdate (to, from, next) {
      this.getPost(to.params.slug)
      next()
    },
    methods: {
      getPost(slug) {
        this.isLoading = true
        axios.get(`${url}?slug=${slug}`)
          .then(res => {
            console.log(res)
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

