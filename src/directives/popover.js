import { createApp, h } from 'vue'

import mountWithContext, { unmountElement } from '../utils/mount-with-context'
import { createPopper } from '@popperjs/core'
import Popover from '../components/popover'
import DynamicPopover from '../plugins/dynamic-popover'

let currentPopover
let documentClickBound = false
let routerGuardBound = false

function isBrowser () {
  return typeof document !== 'undefined'
}

function removeCurrentPopover () {
  if (!currentPopover) return

  currentPopover.popper.destroy()
  unmountElement(currentPopover.element)
  currentPopover = null
}

function handleDocumentClick (event) {
  if (!currentPopover) return

  const { element, trigger } = currentPopover
  if (element.contains(event.target) || trigger.contains(event.target)) return

  removeCurrentPopover()
}

function bindDocumentClick () {
  if (!isBrowser() || documentClickBound) return

  document.addEventListener('click', handleDocumentClick)
  documentClickBound = true
}

function bindRouterGuard () {
  const router = DynamicPopover.app?.config.globalProperties.$router

  if (!router || routerGuardBound) return

  router.afterEach(removeCurrentPopover)
  routerGuardBound = true
}

function unbindPopover (el) {
  const state = el.__view3Popover__
  if (!state) return

  if (state.trigger) {
    el.removeEventListener(state.trigger, state.show)
  }
  if (state.hide) {
    el.removeEventListener('mouseleave', state.hide)
  }
  if (currentPopover?.trigger === el) {
    removeCurrentPopover()
  }

  delete el.__view3Popover__
}

function bindPopover (el, binding) {
  const state = {
    options: binding.value || {},
    trigger: null,
    show: null,
    hide: null
  }

  el.__view3Popover__ = state

  if (!isBrowser() || state.options.disabled) return

  bindDocumentClick()
  bindRouterGuard()

  state.trigger = state.options.trigger || 'click'
  state.show = () => {
    if (state.options.disabled) return

    removeCurrentPopover()

    const instance = createApp({
      render () {
        return h(Popover, state.options)
      }
    })

    const element = mountWithContext(instance, DynamicPopover.app)

    if (state.trigger === 'mouseenter') {
      element.addEventListener('mouseleave', state.hide)
    }

    currentPopover = {
      element,
      popper: createPopper(el, element, { placement: state.options.placement || 'top' }),
      trigger: el
    }
  }

  state.hide = (event) => {
    if (currentPopover?.trigger === el && !currentPopover.element.contains(event.relatedTarget)) {
      removeCurrentPopover()
    }
  }

  el.addEventListener(state.trigger, state.show)

  if (state.trigger === 'mouseenter') {
    el.addEventListener('mouseleave', state.hide)
  }
}

export default {
  mounted: bindPopover,
  updated (el, binding) {
    unbindPopover(el)
    bindPopover(el, binding)
  },
  unmounted: unbindPopover
}
