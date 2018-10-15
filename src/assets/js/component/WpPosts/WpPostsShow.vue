<template>
  <div>
    <template v-if="post">
      <slot :post="post" :description="description">
        <div class="mb-5">
          <h1>{{ post.title.rendered }}</h1>
          <p class="lead">{{ description }}</p>
        </div>
        <hr>
        <div v-html="post.content.rendered"></div>
        <p><a class="btn btn-info btn-sm" :href="url">API</a></p>
      </slot>
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
  props: {
    url: {
      type: String,
      requred: true
    }
  },
  data() {
    return {
      post: null,
      isLoading: false
    }
  },
  computed: {
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
    this.getPost()
  },
  methods: {
    getPost() {
      this.isLoading = true
      axios.get(this.url)
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
  },
  filters: {
    date(str) {
      return str.replace(/-/g, '/').split('T')[0]
    }
  }
}
</script>
