<template>
  <div>
    <label>{{ label }}</label>
    <input
      v-bind="$attrs"
      v-bind:type="type"
      v-bind:value="value"
      v-on:input="handleInputChange"
      v-focus
    />
  </div>
</template>
<script>
export default {
  props: ['label', 'type', 'value'],
  methods: {
    handleInputChange(e) {
      this.$emit('update:value', e.target.value)
    }
  }
}
</script>
