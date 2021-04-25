<!--
 * @Author: zhouxs
 * @Date: 2020-10-26 15:41:23
 * @LastEditors: zhouxs
 * @LastEditTime: 2020-10-28 16:28:44
 * @Description: file content
-->
<template>
  <drag-wrap class="wrap" :data="list" @watchData="watchData">
    <drag-item class="item" v-for="(item, index) in list" :key="index">
      <template #drag>
        <div>拖拽Dom</div>
      </template>
      <div>{{item}}</div>
    </drag-item>
  </drag-wrap>
</template>

<script>
import DragWrap from '../components/Drag/DragWrap'
import DragItem from '../components/Drag/DragItem'
export default {
  data() {
    return {
      list: [111, 222, 333, 444, 555, 666, 777, 888, 999],
    }
  },
  components: {
    DragWrap,
    DragItem,
  },
  methods: {
    watchData(newList) {
      console.log('newList', newList)
    },
  },
}
</script>