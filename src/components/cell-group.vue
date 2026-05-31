<template>
  <div class="ivu-cell-group">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'CellGroup',
  provide () {
    return {
      CellGroupInstance: this
    }
  },
  emits: ['on-click'],
  methods: {
    handleClick (name) {
      this.$emit('on-click', name)
    }
  }
}
</script>
