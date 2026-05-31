import { createApp, h } from 'vue'

import Notification from '../components/notification'
import mountWithContext, { unmountElement } from '../utils/mount-with-context'

function createInstance (properties) {
  let node
  let component
  let mountedElement
  let destroyed = false
  const _props = properties || {}

  const instance = createApp({
    render () {
      node = h(Notification, _props)

      return node
    }
  })

  mountedElement = mountWithContext(instance)

  component = node.component.proxy

  return {
    notice (noticeProps) {
      component.add(noticeProps)
    },
    remove (name) {
      component.close(name)
    },
    component: component,
    destroy (element) {
      if (destroyed) return

      destroyed = true
      component.closeAll()

      setTimeout(() => {
        const target = mountedElement || document.getElementsByClassName(element)[0]

        unmountElement(target)
      }, 500)
    }
  }
}

export default createInstance
