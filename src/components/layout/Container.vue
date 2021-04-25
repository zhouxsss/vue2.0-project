<!--
 * @Author: your name
 * @Date: 2020-10-14 14:29:05
 * @LastEditTime: 2020-10-20 15:55:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue2.0-project/src/components/layout/Container.vue
-->
<template>
  <div :class="$style.container">
    <ul>
      <li v-for="menu in menus" :key="menu.title">
        <router-link :to="menu.path">{{ menu.title }}</router-link>
      </li>
    </ul>
    <div :class="$style.main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['menus'],
}
</script>

<style module lang="scss">
.container {
  display: flex;
  width: 100%;
  height: 100%;
  ul {
    min-width: 100px;
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
