import { createApp, h } from 'vue'
import mountWithContext, { unmountElement } from '../utils/mount-with-context'

function createInstance (app, component, props, render, onRemove) {
  let node
  let mountedElement
  let removeTimer
  let destroyed = false

  const instance = createApp({
    methods: {
      remove () {
        clearTimeout(removeTimer)
        removeTimer = setTimeout(() => {
          this.destroy()
        }, 300)
      },
      destroy () {
        if (destroyed) return

        destroyed = true
        clearTimeout(removeTimer)
        unmountElement(mountedElement || this.$el)
        onRemove?.()
      }
    },
    render () {
      node = h(component, {
        ...props,
        onVisibleChange: (visible) => {
          if (!visible) this.remove()
        }
      }, () => [
        render(h)
      ])

      return node
    }
  })

  mountedElement = mountWithContext(instance, app)

  return {
    show () {
      node.component.proxy.visible = true
    },

    remove () {
      node.component.proxy.visible = false
    }
  }
}
export default createInstance
