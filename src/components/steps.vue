<template>
  <div :class="classes">
    <slot />
  </div>
</template>
<script>
import { oneOf } from '../utils/assist'

const prefixCls = 'ivu-steps'

function debounce (fn) {
  let waiting
  return function () {
    if (waiting) return
    waiting = true
    const context = this
    const args = arguments
    const later = function () {
      waiting = false
      fn.apply(context, args)
    }
    this.$nextTick(later)
  }
}

export default {
  name: 'Steps',
  provide () {
    return {
      StepsInstance: this
    }
  },
  props: {
    current: {
      type: Number,
      default: 0
    },
    status: {
      validator (value) {
        return oneOf(value, ['wait', 'process', 'finish', 'error'])
      },
      default: 'process'
    },
    size: {
      validator (value) {
        return value == null || oneOf(value, ['small'])
      },
      default: null
    },
    direction: {
      validator (value) {
        return oneOf(value, ['horizontal', 'vertical'])
      },
      default: 'horizontal'
    }
  },
  data () {
    return {
      steps: []
    }
  },
  computed: {
    classes () {
      return [
                    `${prefixCls}`,
                    `${prefixCls}-${this.direction}`,
                    {
                      [`${prefixCls}-${this.size}`]: !!this.size
                    }
      ]
    }
  },
  watch: {
    current () {
      this.updateChildProps()
    },
    direction () {
      this.updateChildProps()
    },
    status () {
      this.updateCurrent()
    }
  },
  mounted () {
    this.updateSteps()
  },
  methods: {
    registerStep (step) {
      if (!this.steps.includes(step)) {
        this.steps.push(step)
        this.debouncedUpdateSteps()
      }
    },
    unregisterStep (step) {
      const index = this.steps.indexOf(step)
      if (index > -1) {
        this.steps.splice(index, 1)
        this.debouncedUpdateSteps()
      }
    },
    updateChildProps (isInit) {
      const total = this.steps.length
      this.steps.forEach((child, index) => {
        child.stepNumber = index + 1

        if (this.direction === 'horizontal') {
          child.total = total
        }

        // 如果已存在status,且在初始化时,则略过
        // todo 如果当前是error,在current改变时需要处理
        if (!(isInit && child.currentStatus)) {
          if (index === this.current) {
            if (this.status !== 'error') {
              child.currentStatus = 'process'
            }
          } else if (index < this.current) {
            child.currentStatus = 'finish'
          } else {
            child.currentStatus = 'wait'
          }
        }

        if (child.currentStatus !== 'error' && index !== 0) {
          this.steps[index - 1].nextError = false
        }
      })
    },
    setNextError () {
      this.steps.forEach((child, index) => {
        if (child.currentStatus === 'error' && index !== 0) {
          this.steps[index - 1].nextError = true
        }
      })
    },
    updateCurrent (isInit) {
      // 防止溢出边界
      if (this.current < 0 || this.current >= this.steps.length) {
        return
      }
      if (isInit) {
        const currentStatus = this.steps[this.current].currentStatus
        if (!currentStatus) {
          this.steps[this.current].currentStatus = this.status
        }
      } else {
        this.steps[this.current].currentStatus = this.status
      }
    },
    debouncedUpdateSteps: debounce(function () {
      this.updateSteps()
    }),
    updateSteps () {
      this.updateChildProps(true)
      this.setNextError()
      this.updateCurrent(true)
    }
  }
}
</script>
