<template>
  <Container :menus="$root.routes[0].children">
    <router-view />
  </Container>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count
    },
  },
}
</script>
