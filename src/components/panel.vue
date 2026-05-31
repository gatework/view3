<template>
  <div :class="itemClasses">
    <div
      :class="headerClasses"
      @click="toggle"
    >
      <Icon
        v-if="!hideArrow"
        type="ios-arrow-forward"
      />
      {{ ' ' }}
      <slot />
    </div>
    <collapse-transition v-if="mounted">
      <div
        v-show="isActive"
        :class="contentClasses"
      >
        <div :class="boxClasses">
          <slot name="content" />
        </div>
      </div>
    </collapse-transition>
  </div>
</template>
<script>
import Icon from './icon'
import CollapseTransition from './collapse-transition'
const prefixCls = 'ivu-collapse'

export default {
  name: 'Panel',
  components: { Icon, CollapseTransition },
  inject: ['CollapseInstance'],
  props: {
    name: {
      type: String,
      default: ''
    },
    hideArrow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      index: 0,
      isActive: false,
      mounted: false
    }
  },
  computed: {
    itemClasses () {
      return [
                    `${prefixCls}-item`,
                    {
                      [`${prefixCls}-item-active`]: this.isActive
                    }
      ]
    },
    headerClasses () {
      return `${prefixCls}-header`
    },
    contentClasses () {
      return `${prefixCls}-content`
    },
    boxClasses () {
      return `${prefixCls}-content-box`
    }
  },
  mounted () {
    this.mounted = true
    this.CollapseInstance.setActive()
  },
  methods: {
    toggle () {
      this.CollapseInstance.toggle({
        name: this.name || this.index,
        isActive: this.isActive
      })
    }
  }
}
</script>
