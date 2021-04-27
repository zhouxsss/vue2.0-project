<!--
 * @Author: zhouxs
 * @Date: 2020-10-27 17:45:11
 * @LastEditors: zhouxs
 * @LastEditTime: 2020-10-29 17:24:33
 * @Description: file content
-->
<template>
  <div ref="wrap" @dragenter.prevent @dragover.prevent>
    <slot />
  </div>
</template>
<style></style>
<script>
export default {
  name: 'DragWrap',
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
  },
  created() {
    const safe = this
    this.toDom = '' // 拖拽时进入的元素
    this.fromDom = '' // 拖拽起始元素
    this.children = [] // 存放所有子组件
    this.$on('dragstart', safe.onDragStart)
    this.$on('dragenter', safe.onDragEnter)
    this.$on('dragend', safe.onDragEnd)
    this.$on('putChild', child => {
      // 这里的child对应的是子组件的this.$el
      this.children.push(child)
    })
  },
  methods: {
    onDragStart(el) {
      console.warn('----------start')
      this.fromDom = el
    },
    onDragEnter(el) {
      console.warn('----------enter')
      this.toDom = el
      if (this.fromDom === this.toDom) {
        return
      }
      if (this.isPrevNode(this.fromDom, this.toDom)) {
        //将起始节点插入到进入节点的前面
        this.$refs['wrap'].insertBefore(this.fromDom, this.toDom)
      } else {
        // 将起始节点插入到进入节点下一个兄弟节点的前面
        this.$refs['wrap'].insertBefore(this.fromDom, this.toDom.nextSibling)
      }
    },
    onDragEnd() {
      console.warn('----------end')
      if (!this.data.length) return
      const realDomOrder = [...this.$el.children].filter(child =>
        child.classList.contains('__drag_item'),
      )
      this.getDataOrder(realDomOrder, this.children)
    },
    isPrevNode(from, to) {
      // 判断起始节点是佛是进入节点的前面的兄弟节点
      while (from.previousSibling !== null) {
        if (from.previousSibling === to) {
          return true
        }
        from = from.previousSibling
      }
    },
    getDataOrder(realList, dragAfterList) {
      const order = realList.map(realItem =>
        dragAfterList.findIndex(dragItem => dragItem === realItem),
      )
      const newData = []
      // 将原数组的数据按照打乱的序号赋值给新数组
      order.forEach((item, i) => {
        newData[i] = this.data[item]
      })
      //派发新数组
      this.$emit('watchData', newData)
    },
  },
}
</script>
