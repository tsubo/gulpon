<template>
  <div id="jp-index">
    <template v-if="!isLoading">
      <ul class="list-unstyled">
        <li v-for="(post, key) in posts" :key="key" class="media my-4">
          <!-- TODO: 将来の日付のものは表示しない -->
          <div class="media-body">
            <router-link :to="{ name: 'json-posts-show', params: { slug: key }}">
              <h4 class="mt-0 mb-1">
                {{ post.title }}<span class="date"> - {{ post.date | date }}</span>
              </h4>
            </router-link>
            <p v-html="summary(post.contents)"></p>
          </div>
        </li>
      </ul>
      <!-- TODO: ページネーション -->
    </template>

    <p><a class="btn btn-info btn-sm" :href="$store.state.url">Json</a></p>

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
    created() {
      this.getPosts()
    },
    computed: {
      posts() {
        return this.$store.state.posts
      }
    },
    methods: {
      getPosts() {
        // TODO: 一度呼んだらキャッシュすること
        this.isLoading = true
        axios.get(this.$store.state.url)
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
#jp-index .date {
  color: darkgray;
  font-size: 1.4rem;
}
</style>
