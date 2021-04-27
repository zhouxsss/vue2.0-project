<!--
 * @Author: zhouxs
 * @Date: 2020-10-27 17:02:52
 * @LastEditors: zhouxs
 * @LastEditTime: 2020-10-29 17:03:48
 * @Description: file content
-->
<template>
  <div
    @dragstart.stop="onDragStart"
    @dragenter.stop="onDragEnter"
    @dragend.stop="onDragend"
    :draggable="!$slots.drag || isDrag"
    :style="{ cursor: !$slots.drag ? 'move' : '' }"
    class="__drag_item"
  >
    <slot name="drag" />
    <slot />
  </div>
</template>
<style lang="scss">
.__drag_item {
  animation: shake 0.3s;
}
@keyframes shake {
  0% {
    transform: translate3d(-10%, 0, 0);
  }
  50% {
    transform: translate3d(10%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
<script>
import Emitter from './mixins/emitter'
export default {
  name: 'DragItem',
  mixins: [Emitter],
  data() {
    return {
      isDrag: false,
    }
  },
  mounted() {
    if (this.$slots.drag) {
      // 如果有定义具名插槽drag
      this.setSlotAttr()
    }
    // 触发DragWrap这个组件上的putChild方法，参数是当前组件的真实Dom。
    this.dispatch('DragWrap', 'putChild', this.$el)
    this.dispatch('DragWrap', 'test', this.$el)
  },
  methods: {
    onDragStart() {
      this.$el.style.opacity = 0.3
      this.dispatch('DragWrap', 'dragstart', this.$el)
    },
    onDragEnter() {
      this.dispatch('DragWrap', 'dragenter', this.$el) // 触发dragenter
    },
    onDragend() {
      this.$el.style.opacity = '1'
      this.dispatch('DragWrap', 'dragend') // 触发dragend
    },
    setSlotAttr() {
      const slotVNode = this.$slots.default.find(
        // 找到vnode的第一个有效节点
        vnode => !vnode.data && vnode.text !== ' ',
      )
      const dragDom = slotVNode.elm.previousSibling
      // 具名插槽对应的真实Dom
      if (dragDom.previousSibling !== null) {
        // 规定具名插槽内只能有一个根元素，否则报错~
        throw '具名插槽内只能有一个根节点~'
      }
      dragDom.addEventListener('mouseenter', () => {
        // 进入具名插槽的Dom，设置可拖动
        this.isDrag = true
      })
      dragDom.addEventListener('mouseleave', () => {
        // 离开具名插槽的Dom，设置不可拖动
        this.isDrag = false
      })
      dragDom.style.cursor = 'move' // 手势变为可移动
    },
  },
}
</script>
