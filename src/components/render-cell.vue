<script>
import { h } from 'vue'

export default {
  name: 'RenderCell',
  props: {
    render: {
      type: Function,
      default: null
    }
  },
  setup (props) {
    return () => {
      return props.render ? props.render(h) : null
    }
  }
}
</script>
