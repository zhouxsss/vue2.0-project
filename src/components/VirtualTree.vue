<!--
 * @Author: your name
 * @Date: 2020-10-16 16:07:21
 * @LastEditTime: 2020-10-20 15:44:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue2.0-project/src/pages/virtualScrollTree.vue
-->
<template>
  <div class="b-tree" @scroll="handleScroll">
    <div class="b-tree__phantom" :style="{ height: contentHeight }"></div>
    <div class="b-tree__content" :style="{ transform: `translateY(${offset}px)` }">
      <div
        v-for="(item, index) in visibleData"
        :key="index"
        class="b-tree__list-view"
        :style="{ paddingLeft: 18 * (item.level - 1) + 'px' }"
      >
        <i
          :class="item.expand ? 'b-tree__expand' : 'b-tree__close'"
          v-if="item.children && item.children.length"
        />
        <slot :item="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.b-tree {
  position: relative;
  height: 500px;
  overflow-y: scroll;
  &__phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
  }
  &__content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    min-height: 100px;
    &__item {
      padding: 5px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      position: relative;
      align-items: center;
      cursor: pointer;
      &:hover &__selected {
        background-color: #d7d7d7;
      }
      &__icon {
        position: absolute;
        left: 0;
        color: #c040cc;
        z-index: 10;
      }
    }
  }
  &__list-view {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  &__close {
    display: inline-block;
    width: 0;
    height: 0;
    overflow: hidden;
    font-size: 0;
    margin-right: 5px;
    border-width: 5px;
    border-color: transparent transparent transparent #c0c4cc;
    border-style: dashed dashed dashed solid;
  }
  &__expand {
    display: inline-block;
    width: 0;
    height: 0;
    overflow: hidden;
    font-size: 0;
    margin-right: 5px;
    border-width: 5px;
    border-color: #c0c4cc transparent transparent transparent;
    border-style: solid dashed dashed dashed;
  }
}
</style>
<script>
export default {
  name: 'virtualTree',
  props: {
    tree: {
      type: Array,
      required: true,
      default: function() {
        return []
      },
    },
    defaultExpand: { type: Boolean, required: false, default: false },
    option: {
      type: Object,
      required: false,
      default: function() {
        return {}
      },
    },
  },
  data() {
    return {
      offset: 0, //translateY 偏移量
      visibleData: [],
    }
  },
  computed: {
    contentHeight() {
      return (
        (this.flattenTree || []).filter(item => item.visible).length * this.option.itemHeight + 'px'
      )
    },
    flattenTree() {
      const flatten = function(
        list,
        childKey = 'children',
        level = 1,
        parent = null,
        defaultExpand = true,
      ) {
        let arr = []
        list.forEach(item => {
          item.level = level
          if (item.expand === undefined) {
            item.expand = defaultExpand
          }
          if (item.visible === undefined) {
            item.visible = true
          }
          if (!parent.visible || !parent.expand) {
            item.visible = false
          }
          item.parent = parent
          arr.push(item)
          if (item[childKey]) {
            arr.push(...flatten(item[childKey], childKey, level + 1, item, defaultExpand))
          }
        })
        return arr
      }
      return flatten(this.tree, 'children', 1, {
        level: 0,
        visible: true,
        expand: true,
        children: this.tree,
      })
    },
  },
  mounted() {
    this.updateVisibleData()
  },
  methods: {
    handleScroll(e) {
      const scrollTop = e.target.scrollTop
      this.updateVisibleData(scrollTop)
    },
    updateVisibleData(scrollTop = 0) {
      const start = Math.floor(scrollTop / this.option.itemHeight)
      const end = start + this.option.visibleCount
      const allVisibleData = (this.flattenTree || []).filter(item => item.visible)
      this.visibleData = allVisibleData.slice(start, end)
      this.offset = start * this.option.itemHeight
    },
  },
}
</script>
