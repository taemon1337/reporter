import axios from 'axios'

let api = axios.create({
  baseURL: '/templates',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

let templates = {
  findAll: function (opts) {
    return api.get('/odata/templates?$select=name', opts).then(function (resp) {
      return resp.data.value
    }).catch(function (err) {
      console.warn('Error getting templates', err)
    })
  }
}

let render = {
  download: function (data, opts) {
    return api.post('/api/report', data, opts)
  }
}

export default {
  templates: templates,
  render: render
}
