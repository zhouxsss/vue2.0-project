<template>
  <div>
    <label>{{ label }}</label>
    <input v-focus v-bind="$attrs" :type="type" :value="value" @input="handleInputChange" />
  </div>
</template>
<script>
export default {
  props: ['label', 'type', 'value'],
  methods: {
    handleInputChange(e) {
      this.$emit('update:value', e.target.value)
    },
  },
}
</script>
