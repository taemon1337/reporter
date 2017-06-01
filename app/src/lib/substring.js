export function substring (value, length, _default) {
  return value ? value.substring(0, length) + '...' : _default || ''
}
