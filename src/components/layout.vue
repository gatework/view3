<template>
  <div :class="wrapClasses">
    <slot />
  </div>
</template>
<script>
const prefixCls = 'ivu-layout'

export default {
  name: 'Layout',
  props: {
    hasSider: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    wrapClasses () {
      return [
                    `${prefixCls}`,
                    {
                      [`${prefixCls}-has-sider`]: this.hasSider
                    }
      ]
    }
  }
}
</script>
