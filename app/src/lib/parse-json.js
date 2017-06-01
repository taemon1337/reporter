export function parseJson (str, _default) {
  try {
    return JSON.parse(str)
  } catch (err) {
    console.warn('Error parsing to JSON', err)
    return _default || {}
  }
}
