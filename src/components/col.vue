<template>
  <div
    :class="classes"
    :style="styles"
  >
    <slot />
  </div>
</template>
<script>
import { findComponentUpward } from '../utils/assist'
const prefixCls = 'ivu-col'

function parseFlex (flex) {
  if (typeof flex === 'number') {
    return `${flex} ${flex} auto`
  }

  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`
  }

  return flex
}

export default {
  name: 'Col',
  props: {
    span: {
      type: [Number, String],
      default: 0
    },
    order: {
      type: [Number, String],
      default: 0
    },
    offset: {
      type: [Number, String],
      default: 0
    },
    push: {
      type: [Number, String],
      default: 0
    },
    pull: {
      type: [Number, String],
      default: 0
    },
    className: {
      type: String,
      default: ''
    },
    xs: {
      type: [Number, Object],
      default: () => ({})
    },
    sm: {
      type: [Number, Object],
      default: () => ({})
    },
    md: {
      type: [Number, Object],
      default: () => ({})
    },
    lg: {
      type: [Number, Object],
      default: () => ({})
    },
    xl: {
      type: [Number, Object],
      default: () => ({})
    },
    xxl: {
      type: [Number, Object],
      default: () => ({})
    },
    // 4.5.0
    flex: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      gutter: 0
    }
  },
  computed: {
    classes () {
      const classList = [
                    `${prefixCls}`,
                    {
                      [`${prefixCls}-span-${this.span}`]: this.span,
                      [`${prefixCls}-order-${this.order}`]: this.order,
                      [`${prefixCls}-offset-${this.offset}`]: this.offset,
                      [`${prefixCls}-push-${this.push}`]: this.push,
                      [`${prefixCls}-pull-${this.pull}`]: this.pull,
                      [`${this.className}`]: !!this.className
                    }
      ];

      ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
        if (typeof this[size] === 'number') {
          classList.push(`${prefixCls}-span-${size}-${this[size]}`)
        } else if (typeof this[size] === 'object') {
          const props = this[size]
          Object.keys(props).forEach(prop => {
            classList.push(
              prop !== 'span'
                ? `${prefixCls}-${size}-${prop}-${props[prop]}`
                : `${prefixCls}-span-${size}-${props[prop]}`
            )
          })
        }
      })

      return classList
    },
    styles () {
      let style = {}
      if (this.gutter !== 0) {
        style = {
          paddingLeft: this.gutter / 2 + 'px',
          paddingRight: this.gutter / 2 + 'px'
        }
      }

      // 4.5.0
      if (this.flex) {
        style.flex = parseFlex(this.flex)
      }

      return style
    }
  },
  mounted () {
    this.updateGutter()
  },
  beforeUnmount () {
    this.updateGutter()
  },
  methods: {
    updateGutter () {
      const Row = findComponentUpward(this, 'Row')
      if (Row) {
        Row.updateGutter(Row.gutter)
      }
    }
  }
}
</script>
