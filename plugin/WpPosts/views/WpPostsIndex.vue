<template>
  <div id="wp-index">
    <ul class="list-unstyled">
      <li v-for="post in posts" :key="post.id" class="media my-4">
        <div class="media-body">
          <router-link :to="{ name: 'wp-posts-show', params: { slug: post.slug }}">
            <h4 class="mt-0 mb-1">
              {{ post.title.rendered }}<span class="date"> - {{ post.date | date }}</span>
            </h4>
          </router-link>
          <p v-html="summary(post.excerpt.rendered)"></p>
        </div>
      </li>
    </ul>
    <!-- TODO: ページネーション -->

    <p><a class="btn btn-info btn-sm" :href="$store.state.apiUrl">API</a></p>

    <loading :active.sync="isLoading" color="white" background-color="black"></loading>
  </div>
</template>

<script>
  import Loading from 'vue-loading-overlay'
  import 'vue-loading-overlay/dist/vue-loading.css'

  const axios = require('axios')

  export default {
    components: {
      Loading
    },
    data: () => {
      return {
        isLoading: false
      }
    },
    computed: {
      posts() {
        return this.$store.state.posts
      }
    },
    created() {
      this.getPosts()
    },
    methods: {
      getPosts() {
        if (Object.keys(this.$store.state.posts).length > 0) {
          return
        }

        this.isLoading = true
        axios.get(this.$store.state.apiUrl)
          .then(res => {
            this.$store.commit('setPosts', res.data)
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      summary: (str) => {
        if (str.length <= 200) {
          return str
        }
        return str.substr(0, 200) + '...'
      }
    },
    filters: {
      date: (str) => {
        return str.replace(/-/g, '/').split('T')[0]
      },
    },
  }
</script>

<style>
#wp-index .date {
  color: darkgray;
  font-size: 1.4rem;
}
</style>


