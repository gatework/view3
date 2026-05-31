function getError (action, option, xhr) {
  const message = `Upload request to ${action} failed with status ${xhr.status}`
  const error = new Error(message)
  error.status = xhr.status
  error.method = 'post'
  error.url = action
  return error
}

function getBody (xhr) {
  const text = xhr.responseText || xhr.response
  if (!text) return text

  try {
    return JSON.parse(text)
  } catch (_) {
    return text
  }
}

export default function upload (option) {
  const xhr = new XMLHttpRequest()
  const action = option.action

  if (xhr.upload && option.onProgress) {
    xhr.upload.addEventListener('progress', (event) => {
      if (event.total > 0) event.percent = (event.loaded / event.total) * 100
      option.onProgress(event)
    })
  }

  const formData = new FormData()

  if (option.data) {
    Object.entries(option.data).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }

  formData.append(option.filename, option.file)

  xhr.addEventListener('error', () => {
    option.onError(getError(action, option, xhr), getBody(xhr))
  })

  xhr.addEventListener('load', () => {
    const body = getBody(xhr)
    if (xhr.status < 200 || xhr.status >= 300) {
      option.onError(getError(action, option, xhr), body)
      return
    }

    option.onSuccess(body)
  })

  xhr.open('post', action, true)

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  Object.entries(option.headers || {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined) xhr.setRequestHeader(key, value)
  })

  xhr.send(formData)

  return xhr
}
