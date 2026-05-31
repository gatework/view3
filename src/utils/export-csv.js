const BOM = '\uFEFF'
const CSV_MIME_TYPE = 'text/csv;charset=utf-8'

function createDownloadUrl (text) {
  if (window.Blob && window.URL?.createObjectURL) {
    const blob = new Blob([BOM + text], { type: CSV_MIME_TYPE })
    const url = window.URL.createObjectURL(blob)

    return {
      url,
      revoke: () => window.URL.revokeObjectURL(url)
    }
  }

  return {
    url: `data:${CSV_MIME_TYPE},${encodeURIComponent(BOM + text)}`,
    revoke: () => {}
  }
}

const csv = {
  download (filename, text) {
    const link = document.createElement('a')
    const { url, revoke } = createDownloadUrl(text)

    link.download = filename
    link.href = url
    link.style.display = 'none'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    window.setTimeout(revoke, 0)
  }
}

export default csv
