import axios from 'axios'

const base = '/api'
const path = {
  surveys: '/surveys',
  reports: '/reports',
  autocompletes: '/autocompletes'
}

let surveys = {
  findAll: function (opts) {
    return axios.get(base + path.surveys, opts)
  }
}

let reports = {
  findAll: function (opts) {
    return axios.get(base + path.reports, opts)
  }
}

let autocompletes = {
  findAll: function (opts) {
    return axios.get(base + path.autocompletes, opts)
  }
}

export default {
  base: base,
  surveys: surveys,
  reports: reports,
  autocompletes: autocompletes
}
