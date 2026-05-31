<template>
  <div
    :class="[prefixCls + '-confirm']"
    @keydown.tab.capture="handleTab"
  >
    <i-button
      v-if="showTime"
      :class="timeClasses"
      size="small"
      type="text"
      :disabled="timeDisabled"
      @click="handleToggleTime"
    >
      {{ labels.time }}
    </i-button>
    <i-button
      size="small"
      @click="handleClear"
      @keydown.enter="handleClear"
    >
      {{ labels.clear }}
    </i-button>
    {{ ' ' }}
    <i-button
      size="small"
      type="primary"
      @click="handleSuccess"
      @keydown.enter="handleSuccess"
    >
      {{ labels.ok }}
    </i-button>
  </div>
</template>
<script>
import iButton from '../../button'
import Locale from '../../../mixins/locale'
import Emitter from '../../../mixins/emitter'

const prefixCls = 'ivu-picker'

export default {
  components: { iButton },
  mixins: [Locale, Emitter],
  props: {
    showTime: Boolean,
    isTime: Boolean,
    timeDisabled: Boolean
  },
  emits: ['on-pick-click', 'on-pick-success', 'on-pick-clear', 'on-pick-toggle-time'],
  data () {
    return {
      prefixCls: prefixCls
    }
  },
  computed: {
    timeClasses () {
      return `${prefixCls}-confirm-time`
    },
    labels () {
      const labels = ['time', 'clear', 'ok']
      const values = [(this.isTime ? 'selectDate' : 'selectTime'), 'clear', 'ok']
      return labels.reduce((obj, key, i) => {
        obj[key] = this.t('i.datepicker.' + values[i])
        return obj
      }, {})
    }
  },
  methods: {
    handleClear () {
      this.$emit('on-pick-clear')
    },
    handleSuccess () {
      this.$emit('on-pick-success')
    },
    handleToggleTime () {
      if (this.timeDisabled) return
      this.$emit('on-pick-toggle-time')
      this.dispatch('CalendarPicker', 'focus-input')
      this.dispatch('CalendarPicker', 'update-popper')
    },
    handleTab (e) {
      const tabbables = [...this.$el.children]
      const expectedFocus = tabbables[e.shiftKey ? 'shift' : 'pop']()

      if (document.activeElement === expectedFocus) {
        e.preventDefault()
        e.stopPropagation()
        this.dispatch('CalendarPicker', 'focus-input')
      }
    }
  }
}
</script>
