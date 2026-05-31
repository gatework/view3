import newInstance from './create-dialog'

let dialogInstance

function normalizeProps (props) {
  if (typeof props === 'string') return { content: props }
  if (!props) return {}
  return { ...props }
}

function getInstance (render = undefined, lockScroll = true) {
  dialogInstance = dialogInstance || newInstance({
    closable: false,
    maskClosable: false,
    footerHide: true,
    render: render,
    lockScroll
  })

  return dialogInstance
}

export default {
  show (options = {}) {
    options = normalizeProps(options)
    const render = ('render' in options) ? options.render : undefined
    const lockScroll = ('lockScroll' in options) ? options.lockScroll : true
    const instance = getInstance(render, lockScroll)
    const onRemove = options.onRemove

    options.onRemove = function () {
      if (typeof onRemove === 'function') onRemove()
      dialogInstance = null
    }

    instance.show(options)
  },
  info (props = {}) {
    props = normalizeProps(props)
    props.icon = 'info'
    props.showCancel = false

    return this.show(props)
  },

  success (props = {}) {
    props = normalizeProps(props)
    props.icon = 'success'
    props.showCancel = false
    return this.show(props)
  },

  warning (props = {}) {
    props = normalizeProps(props)
    props.icon = 'warning'
    props.showCancel = false
    return this.show(props)
  },
  error (props = {}) {
    props = normalizeProps(props)
    props.icon = 'error'
    props.showCancel = false
    return this.show(props)
  },
  confirm (props = {}) {
    props = normalizeProps(props)
    props.icon = 'confirm'
    props.showCancel = true
    return this.show(props)
  },
  remove () {
    if (!dialogInstance) { // at loading status, remove after Cancel
      return false
    }

    const instance = getInstance()

    instance.remove()
  },
  install (app, _) {
    app.config.globalProperties.$Dialog = this
  }
}
