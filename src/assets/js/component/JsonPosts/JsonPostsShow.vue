<template>
  <div>
    <template v-if="post">
      <slot :post="post" :description="description">
        <div class="mb-4">
          <h1>{{ post.title}}</h1>
          <p class="lead">{{ description }}</p>
        </div>
        <hr>
        <div v-html="post.contents"></div>

        <p><a class="btn btn-info btn-sm" :href="url">Json</a></p>
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
      return this.post.date.replace(/-/g, '/').split('T')[0]
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
          this.post = res.data
          console.log(this.post)
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
