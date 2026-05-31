<template>
  <li
    v-show="!hidden"
    :class="[prefixCls + '-wrap']"
  >
    <div :class="[prefixCls + '-title']">
      {{ label }}
    </div>
    <ul>
      <li
        ref="options"
        :class="[prefixCls]"
      >
        <slot />
      </li>
    </ul>
  </li>
</template>
<script>
import Emitter from '../mixins/emitter'

const prefixCls = 'ivu-select-group'

export default {
  name: 'OptionGroup',
  mixins: [Emitter],
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      prefixCls: prefixCls,
      hidden: false // for search
    }
  },
  mounted () {
    this.mitt.on('on-query-change', this.queryChange)
  },
  beforeUnmount () {
    this.mitt.off('on-query-change', this.queryChange)
  },
  methods: {
    queryChange () {
      this.$nextTick(() => {
        const options = this.$refs.options.querySelectorAll('.ivu-select-item')
        let hasVisibleOption = false
        for (let i = 0; i < options.length; i++) {
          if (options[i].style.display !== 'none') {
            hasVisibleOption = true
            break
          }
        }
        this.hidden = !hasVisibleOption
      })
    }
  }
}
</script>
