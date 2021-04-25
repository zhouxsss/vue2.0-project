<template>
  <header>
    <h1>header</h1>
    <ul>
      <li v-for="route in routes" :key="route.path">
        <router-link :to="route.path">{{ route.title }}</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
import routes from '../../utils/routes'
export default {
  data() {
    return {
      routes,
    }
  },
}
</script>

<style module lang="scss">
header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd;
  ul {
    padding: 0;
    list-style-type: none;
    li {
      display: inline-block;
      padding: 10px;
    }
  }
}
</style>
