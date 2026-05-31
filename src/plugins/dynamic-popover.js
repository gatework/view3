import { createApp, h } from 'vue'
import mountWithContext, { unmountElement } from '../utils/mount-with-context'

import { createPopper } from '@popperjs/core'
import Popover from '../components/popover'

let currentPopover
let documentClickBound = false

function isBrowser () {
  return typeof document !== 'undefined'
}

function removeCurrentPopover () {
  if (currentPopover) {
    currentPopover.popper.destroy()
    unmountElement(currentPopover.element)
    currentPopover = null
  }
}

function handleDocumentClick (event) {
  if (!currentPopover) return

  const { element, trigger } = currentPopover
  if (element.contains(event.target) || trigger?.contains(event.target)) return

  removeCurrentPopover()
}

function bindDocumentClick () {
  if (!isBrowser() || documentClickBound) return

  document.addEventListener('click', handleDocumentClick)
  documentClickBound = true
}

export default {
  show (el, component, options, context) {
    if (!isBrowser()) return

    bindDocumentClick()
    removeCurrentPopover()

    const instance = createApp({
      ...context,
      render () {
        return h(Popover, {
          bodyStyle: 'padding: 0'
        }, () => [
          h(component, options)
        ])
      }
    })

    const node = mountWithContext(instance, this.app)

    currentPopover = {
      element: node,
      popper: createPopper(el, node, { placement: options?.placement || 'top' }),
      trigger: el
    }
  },
  remove () {
    removeCurrentPopover()
  },
  install (app, _) {
    this.app = app

    app.config.globalProperties.$Popover = this
  }
}
