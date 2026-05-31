<script>
import { h } from 'vue'

export default {
  props: {
    options: {
      type: Array,
      default () {
        return []
      }
    },
    slotOptions: {
      type: Array,
      default () {
        return []
      }
    },
    slotUpdateHook: {
      type: Function,
      default: () => {}
    }
  },
  render () {
    const slotKeys = this.slotOptions[0]?.children?.map && this.slotOptions[0]?.children?.map((e) => e.props) || []
    const newSlotKeys = this.$parent.$parent.$parent.$slots.default()[0].children[0]?.children?.map && this.$parent.$parent.$parent.$slots.default()[0].children[0]?.children.map((e) => e.props) || []

    if (JSON.stringify(slotKeys) !== JSON.stringify(newSlotKeys)) {
      this.slotUpdateHook()
    }

    return h('ul', {}, [this.$slots.default(), this.options])
  }
}
</script>
