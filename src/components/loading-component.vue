<template lang="html">
  <div :class="wrapperClasses">
    <div :class="spinnerClasses">
      <Spin fix>
        <Icon
          type="ios-loading"
          size="18"
          :class="iconClasses"
        />
        <div
          v-if="text"
          :class="textClasses"
        >
          {{ text }}
        </div>
      </Spin>
    </div>
  </div>
</template>

<script>
import Spin from './spin.vue'
import Icon from './icon.vue'

const prefixCls = 'ivu-scroll'

export default {
  name: 'LoadingComponent',
  components: { Spin, Icon },
  props: {
    text: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    spinnerHeight: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    wrapperClasses () {
      return [
                    `${prefixCls}-loader-wrapper`,
                    {
                      [`${prefixCls}-loader-wrapper-active`]: this.active
                    }
      ]
    },
    spinnerClasses () {
      return `${prefixCls}-spinner`
    },
    iconClasses () {
      return `${prefixCls}-spinner-icon`
    },
    textClasses () {
      return `${prefixCls}-loader-text`
    }
  }
}
</script>
