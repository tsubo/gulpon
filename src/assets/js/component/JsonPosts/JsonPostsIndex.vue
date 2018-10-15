<template>
  <div>
    <template v-if="!isLoading">
      <ul class="list-unstyled">
        <li v-for="(post, key) in posts" :key="key" class="media my-4">
          <!-- TODO: 将来の日付のものは表示しない -->
          <div class="media-body">
            <a :href="pageUrl(key)">
              <h4 class="mt-0 mb-1">
                {{ post.title }}<span class="date"> - {{ post.date | date }}</span>
              </h4>
            </a>
            <p v-html="summary(post.contents)"></p>
          </div>
        </li>
      </ul>
      <!-- TODO: ページネーション -->
    </template>

    <p><a class="btn btn-info btn-sm" :href="url">Json</a></p>

    <loading :active.sync="isLoading" color="white" background-color="black"></loading>
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
    props: {
      url: {
        type: String,
        requred: true
      }
    },
    data() {
      return {
        posts: {},
        isLoading: false
      }
    },
    created() {
      this.getPosts()
    },
    methods: {
      getPosts() {
        this.isLoading = true
        axios.get(this.url)
          .then(res => {
            this.posts = res.data
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.isLoading = false
          })
      },
      pageUrl(slug) {
        return `./page/?slug=${slug}`
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
