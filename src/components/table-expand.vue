<script>
import { h } from 'vue'

export default {
  name: 'TableExpand',
  props: {
    row: {
      type: Object,
      default: () => ({})
    },
    render: {
      type: Function,
      default: null
    },
    index: {
      type: Number,
      default: 0
    },
    column: {
      type: Object,
      default: null
    }
  },
  setup (props) {
    return () => {
      if (!props.render) return null

      const params = {
        row: props.row,
        index: props.index
      }

      if (props.column) params.column = props.column

      return props.render(h, params)
    }
  }
}
</script>
