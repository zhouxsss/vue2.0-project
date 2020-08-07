<template>
  <div :class="$style.container">
    <ul>
      <li v-for="route in Object.keys(rootMenus)" :key="route">
        <v-link :href="route">{{rootMenus[route]}}</v-link>
      </li>
    </ul>
    <div :class="$style.main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import VLink from '../VLink'
export default {
  components: {
    VLink
  },
  data() {
    return {
      rootMenus: this.$root.rootMenus
    }
  },
  methods: {
    myRender(val) {
      return val
    }
  }
}
</script>

<style module lang="scss">
.container {
  display: flex;
  width: 100%;
  height: 100%;
  ul {
    width: 100px;
    padding: 0;
    list-style-type: none;
    border-right: 1px solid #dddddd;
    li {
      padding: 10px;
    }
  }
  .main {
    padding: 10px;
    flex: 1;
  }
}
</style>
