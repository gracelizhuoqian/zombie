<template>
  <my-markdown/>
</template>

<script>
  export default {
    components: {
      'my-markdown': () => {
        import('../../../example/doc/ex.md');
      }
    }
  }

</script>

<style scoped>

</style>
