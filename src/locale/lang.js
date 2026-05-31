const isServer = typeof window === 'undefined'

export default function (lang) {
  if (isServer || typeof window.iview === 'undefined') return

  window.iview.langs ||= {}
  window.iview.langs[lang.i.locale] = lang
}
