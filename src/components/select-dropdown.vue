<template>
  <div
    class="ivu-select-dropdown"
    :class="className"
    :style="styles"
  >
    <slot />
  </div>
</template>
<script>
import { createPopper } from '@popperjs/core'
import { getStyle } from '../utils/assist';
import { transferIndex, transferIncrease } from '../utils/transfer-queue'
import Emitter from '../mixins/emitter'

const isServer = typeof window === 'undefined'

export default {
  name: 'SelectDropdown',
  mixins: [Emitter],
  props: {
    placement: {
      type: String,
      default: 'bottom-start'
    },
    className: {
      type: String,
      default: ''
    },
    transfer: {
      type: Boolean
    }
  },
  data () {
    return {
      popper: null,
      width: '',
      popperStatus: false,
      tIndex: this.handleGetIndex()
    }
  },
  computed: {
    styles () {
      const style = {}
      if (this.width) style.minWidth = `${this.width}px`
      if (this.width) style.maxWidth = `${this.width}px`

      if (this.transfer) style['z-index'] = 1060 + this.tIndex

      return style
    }
  },
  created () {
    this.mitt.on('on-update-popper', this.update)
    this.mitt.on('on-destroy-popper', this.destroy)
  },
  beforeUnmount () {
    this.mitt.off('on-update-popper', this.update)
    this.mitt.off('on-destroy-popper', this.destroy)

    if (this.popper) {
      this.popper.destroy()
      this.popper = null
    }
  },
  methods: {
    update () {
      if (isServer) return
      this.$nextTick(() => {
        if (this.popper) {
          this.popper.update().then(() => {
            this.resetTransformOrigin()
          })
          this.popperStatus = true
        } else {
          this.popper = createPopper(this.$parent.$parent.$refs.reference, this.$el, {
            placement: this.placement,
            modifiers: [
              {
                name: 'computeStyles',
                options: {
                  gpuAcceleration: false
                }
              },
              {
                name: 'preventOverflow',
                options: {
                  boundary: 'viewport'
                }
              },
              {
                name: 'eventListeners',
                options: {
                  scroll: false,
                  resize: false
                }
              }
            ]
          })

          this.popper.update().then(() => {
            this.resetTransformOrigin()
          })
        }
        // set a height for parent is Modal and Select's width is 100%
        if (this.$parent.$options.name === 'VSelect') {
          this.width = parseInt(getStyle(this.$parent.$el, 'width'))
        } else if (this.$parent.$parent.$options.name === 'VSelect') {
          this.width = parseInt(getStyle(this.$parent.$parent.$el, 'width'))
        }
        this.tIndex = this.handleGetIndex()
      })
    },
    destroy () {
      if (this.popper) {
        setTimeout(() => {
          if (this.popper && !this.popperStatus) {
            this.popper.destroy()
            this.popper = null
          }
          this.popperStatus = false
        }, 300)
      }
    },
    resetTransformOrigin () {
      // 不判断，Select 会报错，不知道为什么
      if (!this.popper) return

      const placement = this.popper.state.placement
      const popper = this.popper.state.elements.popper
      const placementStart = placement.split('-')[0]
      const placementEnd = placement.split('-')[1]
      const leftOrRight = placement === 'left' || placement === 'right'
      if (!leftOrRight) {
        popper.style.transformOrigin = placementStart === 'bottom' || (placementStart !== 'top' && placementEnd === 'start') ? 'center top' : 'center bottom'
      }
    },
    handleGetIndex () {
      transferIncrease()
      return transferIndex
    }
  }
}
</script>
