<template>
  <div>
    <template v-if="post">
      <title-header :title="title" :description="description"></title-header>

      <div class="container">
        <hr>
        <div v-html="content"></div>

        <p><a class="btn btn-info btn-sm" :href="getApiUrl()">API</a></p>
      </div>
    </template>

    <loading :active.sync="isLoading" color="white" background-color="black"></loading>
  </div>
</template>

<script>
  import TitleHeader from '../component/TitleHeader'
  import Loading from 'vue-loading-overlay'
  import 'vue-loading-overlay/dist/vue-loading.css'

  const axios = require('axios')

  export default {
    components: {
      TitleHeader,
      Loading
    },
    data: () => {
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

