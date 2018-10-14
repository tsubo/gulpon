<template>
  <div id="jp-show" class="pb-4">
    <template v-if="post">
      <div class="mb-4">
        <h1>{{ post.title }}</h1>
        <p class="lead">{{ description }}</p>
      </div>
      <hr>
      <div v-html="post.contents"></div>
    </template>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        slug: '',
        post: null,
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
      this.slug = this.$route.params.slug
      this.getPost()
    },
    beforeRouteUpdate (to, from, next) {
      this.slug = this.$route.params.slug
      this.getPost()
      next()
    },
    methods: {
      getPost() {
        this.post = this.$store.getters.post(this.slug)
      }
    }
  }
</script>

<style>
#jp-show .lead {
  color: gray;
  font-size: 1.4rem;
}
</style>
