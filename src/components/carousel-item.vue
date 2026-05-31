<template>
  <div
    :class="prefixCls"
    :style="styles"
  >
    <slot />
  </div>
</template>
<script>
const prefixCls = 'ivu-carousel-item'

export default {
  componentName: 'carousel-item',
  name: 'CarouselItem',
  inject: ['CarouselInstance'],
  data () {
    return {
      prefixCls: prefixCls,
      width: 0,
      height: 'auto',
      left: 0
    }
  },
  computed: {
    styles () {
      return {
        width: `${this.width}px`,
        height: `${this.height}`,
        left: `${this.left}px`
      }
    }
  },
  watch: {
    width (val) {
      if (val && this.CarouselInstance.loop) {
        this.$nextTick(() => {
          this.CarouselInstance.initCopyTrackDom()
        })
      }
    },
    height (val) {
      if (val && this.CarouselInstance.loop) {
        this.$nextTick(() => {
          this.CarouselInstance.initCopyTrackDom()
        })
      }
    }
  },
  mounted () {
    this.CarouselInstance.registerSlide(this)
  },
  beforeUnmount () {
    this.CarouselInstance.unregisterSlide(this)
  }
}
</script>
