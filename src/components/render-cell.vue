<script>
import { h } from 'vue'

export default {
  name: 'RenderCell',
  props: {
    render: Function
  },
  setup (props) {
    return () => {
      return props.render ? props.render(h) : null
    }
  }
}
</script>
