import { createApp, h } from 'vue'

import { createPopper } from '@popperjs/core'
import Tooltip from '../components/dynamic-tooltip'
import mountWithContext, { unmountElement } from '../utils/mount-with-context'

let currentTooltip
let documentClickBound = false

function isBrowser () {
  return typeof document !== 'undefined'
}

function removeCurrentTooltip () {
  if (!currentTooltip) return

  currentTooltip.popper.destroy()
  unmountElement(currentTooltip.element)
  currentTooltip = null
}

function handleDocumentClick (event) {
  if (!currentTooltip) return

  const { element, trigger } = currentTooltip
  if (element.contains(event.target) || trigger.contains(event.target)) return

  removeCurrentTooltip()
}

function bindDocumentClick () {
  if (!isBrowser() || documentClickBound) return

  document.addEventListener('click', handleDocumentClick)
  documentClickBound = true
}

function unbindTooltip (el) {
  const state = el.__view3Tooltip__
  if (!state) return

  if (state.trigger) {
    el.removeEventListener(state.trigger, state.show)
  }
  if (state.hide) {
    el.removeEventListener('mouseleave', state.hide)
  }
  if (currentTooltip?.trigger === el) {
    removeCurrentTooltip()
  }

  delete el.__view3Tooltip__
}

function bindTooltip (el, binding) {
  const state = {
    options: binding.value || {},
    trigger: null,
    show: null,
    hide: null
  }

  el.__view3Tooltip__ = state

  if (!isBrowser() || state.options.disabled) return

  bindDocumentClick()

  state.trigger = state.options.trigger || 'mouseenter'
  state.show = () => {
    if (state.options.disabled) return

    removeCurrentTooltip()

    const instance = createApp({
      render () {
        return h(Tooltip, state.options)
      }
    })

    const element = mountWithContext(instance)

    currentTooltip = {
      element,
      popper: createPopper(el, element, {
        placement: state.options.placement || 'top'
      }),
      trigger: el
    }
  }

  state.hide = (event) => {
    if (currentTooltip?.trigger === el && !currentTooltip.element.contains(event.relatedTarget)) {
      removeCurrentTooltip()
    }
  }

  el.addEventListener(state.trigger, state.show)

  if (state.trigger !== 'click') {
    el.addEventListener('mouseleave', state.hide)
  }
}

export default {
  mounted: bindTooltip,
  updated (el, binding) {
    unbindTooltip(el)
    bindTooltip(el, binding)
  },
  unmounted: unbindTooltip
}
