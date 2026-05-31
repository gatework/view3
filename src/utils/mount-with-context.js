export default function mountWithContext (target, app) {
  if (app?._context && target?._context) {
    target._context.components = app._context.components
    target._context.directives = app._context.directives
    target._context.provides = app._context.provides
    target._context.config = app._context.config
    target._context.mixins = app._context.mixins
  }

  const elem = document.createElement('div')

  const node = target.mount(elem).$el

  node.__view3App__ = target
  document.body.appendChild(node)

  return node
}

export function unmountElement (element) {
  if (!element) return

  const app = element.__view3App__
  delete element.__view3App__

  if (app) app.unmount()

  if (element.parentNode) {
    element.parentNode.removeChild(element)
  }
}
