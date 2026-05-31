import { h } from 'vue'

export default {
  name: 'Render',
  props: {
    render: {
      type: Function,
      required: true
    },
    data: {
      type: Object,
      default: null
    },
    node: {
      type: [Array, Object],
      default: null
    }
  },
  render () {
    return this.render(h, {
      data: this.data,
      node: this.node
    })
  }
}
