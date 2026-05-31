<script>
import { createPopper as createPopperCore } from '@popperjs/core'

const isServer = typeof window === 'undefined'
const validPlacement = /^(top|bottom|left|right)(-start|-end)?$/

export default {
  props: {
    eventsEnabled: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    boundariesPadding: {
      type: Number,
      default: 5
    },
    reference: {
      type: Object,
      default: null
    },
    popper: {
      type: Object,
      default: null
    },
    offset: {
      type: [Number, String],
      default: 0
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
    // visible: {
    //     type: Boolean,
    //     default: false
    // }
  },
  emits: ['update:modelValue', 'on-popper-show', 'on-popper-hide', 'created'],
  data () {
    return {
      visible: this.modelValue
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler (val) {
        this.visible = val
        this.$emit('update:modelValue', val)
      }
    },
    visible (val) {
      if (val) {
        if (this.handleIndexIncrease) this.handleIndexIncrease() // just use for Poptip
        this.updatePopper()
        this.$emit('on-popper-show')
      } else {
        this.$emit('on-popper-hide')
      }
      this.$emit('update:modelValue', val)
    }
  },
  updated () {
    this.$nextTick(() => this.updatePopper())
  },
  beforeUnmount () {
    if (isServer) return
    if (this.popperJS) {
      this.popperJS.destroy()
    }
  },
  methods: {
    createPopper () {
      if (isServer) return
      if (!validPlacement.test(this.placement)) {
        return
      }

      const popper = this.popper || this.$refs.popper
      const reference = this.reference || this.$refs.reference

      if (!popper || !reference) return

      if (this.popperJS) {
        this.popperJS.destroy()
      }

      const { modifiers, ...options } = this.options
      const userModifiers = Array.isArray(modifiers) ? modifiers : []

      this.popperJS = createPopperCore(reference, popper, {
        ...options,
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
              boundary: 'viewport',
              padding: this.boundariesPadding
            }
          },
          {
            name: 'offset',
            options: {
              offset: [0, Number(this.offset) || 0]
            }
          },
          {
            name: 'eventListeners',
            options: {
              scroll: this.eventsEnabled,
              resize: this.eventsEnabled
            }
          },
          ...userModifiers
        ]
      })

      this.$nextTick(() => {
        this.updatePopper()
        this.$emit('created', this)
      })
    },
    updatePopper () {
      if (isServer) return
      this.popperJS ? this.popperJS.update() : this.createPopper()
    },
    doDestroy () {
      if (isServer) return
      if (this.visible) return
      if (this.popperJS) this.popperJS.destroy()
      this.popperJS = null
    }
  }
}
</script>
