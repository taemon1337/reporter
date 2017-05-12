import axios from 'axios'

let api = axios.create({
  baseURL: '/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

const path = {
  surveys: '/surveys',
  reports: '/reports',
  autocompletes: '/autocompletes'
}

let save = function (base, data, opts) {
  opts = opts || {}
  opts.headers = opts.headers || {}
  if (data._id) {
    let id = data._id
    let attrs = {}
    for (var key in data) {
      if (!key.startsWith('_')) {
        attrs[key] = data[key]
      }
    }
    opts.headers['If-Match'] = data._etag
    return api.patch(base + '/' + id, attrs, opts)
  } else {
    return api.post(base, data, opts)
  }
}

let surveys = {
  save: function (data, opts) {
    return save(path.surveys, data, opts)
  },
  findAll: function (opts) {
    return api.get(path.surveys, opts)
  },
  find: function (opts) {
    return api.get(path.surveys, opts)
  }
}

let reports = {
  save: function (data, opts) {
    return save(path.reports, data, opts)
  },
  findAll: function (opts) {
    return api.get(path.reports, opts)
  },
  find: function (opts) {
    return api.get(path.reports, opts)
  }
}

let autocompletes = {
  findAll: function (opts) {
    return api.get(path.autocompletes, opts)
  }
}

export default {
  api: api,
  surveys: surveys,
  reports: reports,
  autocompletes: autocompletes
}
