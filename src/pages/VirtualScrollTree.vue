<!--
 * @Author: your name
 * @Date: 2020-10-16 16:07:21
 * @LastEditTime: 2020-10-20 15:55:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue2.0-project/src/pages/virtualScrollTree.vue
-->
<template>
  <div>
    虚拟滚动的tree
    <virtual-tree :tree="treeData" :option="option">
      <template v-slot:default="slotProps">
        <p>{{ slotProps.item.title }}</p>
      </template>
    </virtual-tree>
  </div>
</template>
<style lang="scss"></style>
<script>
import virtualTree from '../components/VirtualTree'
const defaultTree = {
  id: 1,
  visible: true,
  title: 1,
  children: [
    {
      id: '1-1',
      visible: true,
      title: '1-1',
    },
  ],
}

export default {
  name: 'VirtualScrollTree',
  data() {
    return {
      treeData: new Array(80).fill(0).reduce((total, current, idx) => {
        total.push({
          ...defaultTree,
          id: idx,
          title: idx,
        })
        return total
      }, []),
      option: {
        itemHeight: 20,
        visibleCount: 10,
      },
    }
  },
  components: {
    virtualTree,
  },
}
</script>
