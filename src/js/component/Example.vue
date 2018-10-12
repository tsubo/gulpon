<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card card-default">
          <div class="card-header">Hello, Vue Component</div>

          <div class="card-body">
            I'm an example of vue single file component.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      console.log('component mounted.')
    }
  }
</script>
