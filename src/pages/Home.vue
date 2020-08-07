<template>
  <Container>
    <p>home</p>
    <p>count:{{ count }}</p>
  </Container>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
</script>
