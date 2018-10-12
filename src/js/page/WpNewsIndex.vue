<template>
  <div>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="{ name: 'wp-news-post', params: { slug: post.slug }}">
          {{ post.title.rendered }}
        </router-link>
      </li>
    </ul>
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
        posts: {},
        isLoading: false
      }
    },
    mounted() {
      this.getPosts()
    },
    methods: {
      getPosts() {
        this.isLoading = true
        axios.get(url)
          .then(res => {
            this.posts = res.data
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
