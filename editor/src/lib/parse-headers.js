import { capitalize } from './capitalize'

export function parseHeaders (definition, hiddenHeaders) {
  if (typeof definition !== 'object') {
    throw new Error('Invalid Headers Definition: ' + definition)
  }
  let headers = []

  for (var key in definition) {
    let hdr = definition[key]

    if (typeof hdr === 'string') {
      if (hiddenHeaders.indexOf(hdr) === -1) {
        headers.push({ name: capitalize(hdr), field: hdr })
      }
    } else if (typeof hdr === 'object') {
      if (hdr.field || hdr.name) {
        hdr.field = hdr.field || hdr.name
        hdr.name = hdr.name || capitalize(hdr.field)
        if (hiddenHeaders.indexOf(hdr.field) === -1) {
          headers.push(hdr)
        }
      }
    } else {
      throw new Error('Invalid Header Definition: ' + hdr)
    }
  }

  return headers
}
