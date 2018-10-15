<template>
  <div id="wp-show">
    <template v-if="post">
      <div class="mb-4">
        <h1>{{ title }}</h1>
        <p class="lead">{{ description }}</p>
      </div>
      <hr>
      <div v-html="content"></div>

      <p><a class="btn btn-info btn-sm" :href="getApiUrl()">API</a></p>
    </template>
    <!-- TODO: 前後のページへの移動ボタン -->

    <loading :active.sync="isLoading" color="white" background-color="dimgray"></loading>
  </div>
</template>

<script>
  import Loading from 'vue-loading-overlay'
  import 'vue-loading-overlay/dist/vue-loading.css'
  import axios from 'axios'

  export default {
    components: {
      Loading
    },
    data() {
      return {
        slug: '',
        post: null,
        isLoading: false
      }
    },
    computed: {
      title() {
        return this.post ? this.post.title.rendered : ''
      },
      content() {
        return this.post ? this.post.content.rendered : ''
      },
      description() {
        if (!this.post) {
          return ''
        }
        const date = this.post.date.replace(/-/g, '/').split('T')[0]
        let authors = this.post._embedded.author.map((item) => item.name)
        authors = authors.join(',')
        return `${date} - ${authors}`
      },
    },
    created() {
      this.slug = this.$route.params.slug
      this.getPost()
    },
    beforeRouteUpdate (to, from, next) {
      this.slug = this.$route.params.slug
      this.getPost()
      next()
    },
    methods: {
      getApiUrl() {
        return `${this.$store.state.apiUrl}?slug=${this.slug}&_embed`
      },
      getPost() {
        this.isLoading = true
        axios.get(this.getApiUrl())
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

<style>
#wp-show .lead {
  color: gray;
  font-size: 1.4rem;
}
#wp-show img {
  max-width: 100%;
  height: auto;
}
</style>
