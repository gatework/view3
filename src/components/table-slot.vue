<script>
import { h, inject } from 'vue'

export default {
  name: 'TableSlot',
  props: {
    row: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    },
    column: {
      type: Object,
      default: null
    },
    display: {
      type: String,
      default: 'block'
    }
  },
  setup (props) {
    const tableRoot = inject('tableRoot')

    return () => {
      const slotName = props.column?.slot
      const slot = slotName ? tableRoot?.$slots?.[slotName] : null

      return h('div', {
        class: {
          'ivu-table-cell-slot': true,
          'ivu-table-cell-slot-inline': props.display === 'inline',
          'ivu-table-cell-slot-inline-block': props.display === 'inline-block'
        }
      }, slot
        ? slot({
            row: props.row,
            column: props.column,
            index: props.index
          })
        : [])
    }
  }
}
</script>
