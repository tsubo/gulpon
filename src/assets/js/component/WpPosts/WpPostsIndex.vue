<template>
  <div>
    <slot :posts="posts">
      <ul class="list-unstyled">
        <li v-for="post in posts" :key="post.id" class="media my-4">
          {{ post.title.renderd }}
          <div class="media-body">
            <a :href="pageUrl(post.slug)">
              <h4 class="mt-0 mb-1">
                {{ post.title.rendered }}<span class="date"> - {{ post.date | date }}</span>
              </h4>
            </a>
            <p v-html="summary(post.excerpt.rendered)"></p>
          </div>
        </li>
      </ul>
      <!-- TODO: ページネーション -->

      <p><a class="btn btn-info btn-sm" :href="apiUrl">API</a></p>

      <loading :active.sync="isLoading" color="white" background-color="dimgray"></loading>
    </slot>
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
    apiUrl: {
      type: String,
      requred: true
    },
    pagePath: {
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
      axios.get(this.apiUrl)
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
      return `${this.pagePath}/?slug=${slug}`
    },
    summary(str) {
      if (str.length <= 200) {
        return str
      }
      return str.substr(0, 200) + '...'
    }
  },
  filters: {
    date(str) {
      return str.replace(/-/g, '/').split('T')[0]
    }
  },
}
</script>

<style>
.date {
  color: darkgray;
  font-size: 1.4rem;
}
</style>
