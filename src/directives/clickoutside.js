export default {
  mounted (el, { value }) {
    function documentHandler (e) {
      if (el.contains(e.target)) {
        return false
      }

      if (typeof el.__vueClickOutsideValue__ === 'function') {
        el.__vueClickOutsideValue__(e)
      }
    }

    el.__vueClickOutsideValue__ = value
    el.__vueClickOutside__ = documentHandler

    document.addEventListener('click', documentHandler)
  },
  updated (el, { value }) {
    el.__vueClickOutsideValue__ = value
  },
  unmounted (el) {
    if (el.__vueClickOutside__) {
      document.removeEventListener('click', el.__vueClickOutside__)
    }

    delete el.__vueClickOutsideValue__
    delete el.__vueClickOutside__
  }
}
