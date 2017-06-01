import axios from 'axios'
import renderApi from './render'
import { parseJson } from '@/lib/parse-json'

let api = axios.create({
  baseURL: '/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

const path = {
  schemes: '/schemes',
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

let remove = function (base, data, opts) {
  opts = opts || {}
  opts.headers = opts.headers || {}
  if (data._id) {
    opts.headers['If-Match'] = data._etag
    return api.delete(base + '/' + data._id, opts)
  }
}

let schemes = {
  save: function (data, opts) {
    return save(path.schemes, data, opts)
  },
  findAll: function (opts) {
    return api.get(path.schemes, opts)
  },
  find: function (id, opts) {
    return api.get(path.schemes + '/' + id, opts)
  },
  remove: function (data, opts) {
    return remove(path.schemes, data, opts)
  }
}

let reports = {
  save: function (data, opts) {
    return save(path.reports, data, opts)
  },
  findAll: function (opts) {
    return api.get(path.reports, opts)
  },
  find: function (id, opts) {
    return api.get(path.reports + '/' + id, opts)
  },
  remove: function (data, opts) {
    return remove(path.reports, data, opts)
  },
  download: function (report, opts) {
    if (report.scheme && report.scheme.render && report.report_json) {
      let data = {
        template: {
          _id: report.scheme.render
        },
        data: parseJson(report.report_json),
        options: {
          'Content-Disposition': 'attachment; filename=' + report.title.replace(/[\s.]+/g, '_') + '.pdf'
        }
      }
      return renderApi.render.download(data)
    } else {
      return new Promise(function (resolve, reject) {
        reject(new Error('Report is missing scheme or scheme.render or report_json which are required in order to download'))
      })
    }
  }
}

let autocompletes = {
  findAll: function (opts) {
    return api.get(path.autocompletes, opts)
  }
}

export default {
  api: api,
  schemes: schemes,
  reports: reports,
  autocompletes: autocompletes
}
