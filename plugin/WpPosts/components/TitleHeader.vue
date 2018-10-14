<template>
  <div id="title-header" class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">{{ title }}</h1>
      <p class="lead">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    description: {
      type: String,
      default: 'Description'
    }
  }
}
</script>
